define(["doh", "require"], function(doh, require){
    if(doh.isBrowser){
        doh.register("Sage.UI.Controls.tests.Numeric", require.toUrl("./Numeric.html"), 30000);
    }
});