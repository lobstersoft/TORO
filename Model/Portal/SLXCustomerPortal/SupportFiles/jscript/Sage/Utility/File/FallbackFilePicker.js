/*globals Sage, dojo, define */
define([
    'dijit/_Widget',
    'Sage/_Templated',
    'dijit/Dialog',
    'require',
    'dojo/string',
    'Sage/UI/Dialogs',
    'Sage/Utility',
    'Sage/Utility/File',
    'Sage/Utility/File/Attachment',
    'dojo/_base/lang',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/i18n',
    'dojo/i18n!./nls/FallbackFilePicker',
    'dojo/text!./templates/FallbackFilePicker_Attachment.html',
    'dojo/text!./templates/FallbackFilePicker_LibraryDoc.html',
    'dojo/_base/declare'
],
// ReSharper disable InconsistentNaming
function (
    _Widget,
    _Templated,
    Dialog,
    require,
    dString,
    Dialogs,
    sageUtility,
    File,
    attachmentUtility,
    dojoLang,
    _DialogLoadingMixin,
    i18n,
    nlsBundle,
    attachmentTemplate,
    libraryDocTemplate,
    declare
 ) {
    var filePicker = declare('Sage.Utility.File.FallbackFilePicker', [_Widget, _Templated], {
        addLibraryFileText: 'Add Library File',
        attachFileText: 'Attach File',
        descriptionText: 'Description',
        uploadFileText: 'Select File',
        okText: 'OK',
        cancelText: 'Cancel',
        _iframeId: 'attachmentPostIFrame',
        _hiddenFields: ['_attachDate', '_accountId', '_activityId', '_contactId', '_contractId', '_defectId', '_historyId', '_leadId', '_opportunityId', '_productId', '_returnId', '_salesOrderId', '_ticketId', '_userId'],
        _showing: false,
        fileType: File.fileType.ftAttachment,
        widgetsInTemplate: true,
        id: 'fallbackFilePicker',
        widgetTemplate: null,
        constructor: function (options) {
            this.inherited(arguments);
            if (options && typeof options === 'object') {
                dojo.mixin(this, options);
            }
        },
        postMixInProperties: function () {
            dojo.mixin(this, i18n.getLocalization('Sage.Utility.File', 'FallbackFilePicker'));
            this.inherited(arguments);
            if (this.fileType != File.fileType.ftLibraryDocs) {
                this.widgetTemplate = new Simplate(eval(attachmentTemplate));
            }
            else {
                this.widgetTemplate = new Simplate(eval(libraryDocTemplate));
            }
        },
        show: function () {
            if (this._postForm) {
                this._postForm.reset();
            }
            this._dialog.show();
            if (this.fileType != File.fileType.ftLibraryDocs) {
                attachmentUtility.getKnownRelationships(this._receiveRelationships, this, true);
            }
            this._showing = true;
        },
        hide: function () {
            this._dialog.hide();
        },
        _onHide: function () {
            if (this._dialog._standby) {
                this._dialog.hideLoading();
            }
            if (this.fileType != File.fileType.ftLibraryDocs) {
                for (var i = 0; i < this._hiddenFields.length; i++) {
                    if (this._hiddenFields[i]) {
                        this[this._hiddenFields[i]].value = '';
                    }
                }
            }
            this.tb_Description.set('value', '');
            this.tb_realFileName.set('value', '');
            this._showing = false;
        },
        _receiveRelationships: function (rels) {
            if (this.fileType == File.fileType.ftLibraryDocs) {
                return;
            }
            for (var rel in rels) {
                //console.log('rel: ' + rel + ' value: ' + rels[rel]);
                if (this['_' + rel]) {
                    this['_' + rel].value = rels[rel];
                } else if (rel) {
                    this['_' + rel] = dojo.create('input', {
                        'type': 'hidden',
                        'name': rel,
                        'value': rels[rel]
                    }, this._postForm);
                    this._hiddenFields.push('_' + rel);
                }
            }
            this._userId.value = sageUtility.getClientContextByKey('userID') || '';
            this._attachDate.value = sageUtility.Convert.toIsoStringFromDate(new Date());
            //dojo.connect(this._iframe, 'onload', this, '_iframeLoad');
        },
        _buildPostUrl: function () {
            var urlparts = [];
            urlparts.push(/https/i.test(window.location.protocol) ? 'https' : 'http');
            urlparts.push('://');
            urlparts.push(window.location.hostname);
            if (window.location.port && window.location.port !== 80) {
                urlparts.push(':', window.location.port);
            }
            urlparts.push('/');
            urlparts.push(sageUtility.getVirtualDirectoryName());
            if (this.fileType != File.fileType.ftLibraryDocs) {
                urlparts.push('/slxdata.ashx/slx/system/-/attachments/file');
            }
            else {
                if (!Sage.Library || !Sage.Library.Manager || !Sage.Library.FileHandler) {
                    Sage.UI.Dialogs.showError(this.invalidContext);
                    return null;
                }
                var sDirId = Sage.Library.FileHandler.findDirectoryId();
                var sUrl = dString.substitute('/slxdata.ashx/slx/system/-/libraryDirectories(\'${0}\')/documents/file', [sDirId]);
                urlparts.push(sUrl);
            }
            var url = urlparts.join('');
            return url;
        },
        _iframeLoad: function (e) {
            if (this._iframe.contentDocument.URL && typeof this._iframe.contentDocument.URL !== 'undefined') {
                if (this.fileType != File.fileType.ftLibraryDocs) {
                    if (this._iframe.contentDocument.URL.indexOf('attachments') > 0) {
                        dojo.publish('/entity/attachment/create', '');
                        this.hide();
                    }
                } else {
                    if (this._iframe.contentDocument.URL.indexOf('/documents/file') > 0) {
                        dojo.publish('/sage/library/manager/libraryDocuments/refresh', null);
                        this.hide();
                    }
                }
            }
        },
        _onNewFile/*onChange*/: function (fileArray) {
            if (fileArray.srcElement && fileArray.srcElement.value.length > 0) {
                if (fileArray.srcElement.value) {
                    var fileName = fileArray.srcElement.value.replace(/^.*[\\\/]/, '');

                    if (this.tb_Description.get('value') === '') {
                        var fileNamePieces = fileName.split('.'),
                            descriptionValue = '';
                        if (fileNamePieces.length <= 2) {
                            descriptionValue = fileNamePieces[0];
                        }
                        else {
                            for (var i = 0; i < fileNamePieces.length - 1; i++) {
                                if (i > 0) {
                                    descriptionValue += '.';
                                }

                                descriptionValue += fileNamePieces[i];
                            }
                        }

                        this.tb_Description.set('value', descriptionValue);
                    }
                    this.tb_realFileName.set('value', fileName);
                }
            }
        },
        _okClick: function () {
            if (this.fileType === File.fileType.ftLibraryDocs) {
                // The action may have to change when a library file is added; the widget will only call _buildPostUrl()
                // the first time the form is submitted since the call to this._postForm.reset() does [not] reset the form action.
                this._postForm.action = this._buildPostUrl();
            }
            this._postForm.submit();
            if (!this._dialog._standby) {
                dojoLang.mixin(this._dialog, new _DialogLoadingMixin());
            }
            this._dialog.showLoading();
            //hack alert!... IE8 does not fire the iframe onload event, so hacking...
            var self = this;
            window.setTimeout(function () {
                if (self._showing) {
                    if (self.fileType != File.fileType.ftLibraryDocs) {
                        dojo.publish('/entity/attachment/create', '');
                    }
                    else {
                        dojo.publish('/sage/library/manager/libraryDocuments/refresh', null);
                    }
                    self.hide();
                }
            }, 5000);
        },
        _cancelClick: function () {
            this.hide();
        }
    });
    return filePicker;
});