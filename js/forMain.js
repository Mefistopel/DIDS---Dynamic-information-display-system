

var cookies=new Object;
document.cookie.replace(/; /g,";").split(";").forEach(function(element){
    var cookie=element.split("=");
    if(cookie.length>1){
        cookies[cookie[0]]=cookie[1];
    }
});
alertObject(cookies)
function alertObject(obj) {
    var str = "";
    for (k in obj) {
        str += k + ": " + obj[k] + "\r\n";
        if (k !="ARRAffinity") eval('document.getElementById("'+k+'").innerHTML='+obj[k]);
    }
}

//eval('document.getElementById("'+htmlObject+'_std_'+city+'").innerHTML='+Std);
//document.getElementById("iron_std").innerHTML = get_cookie('iron');
function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}
// setTimeout(function(){location.reload()}, 4000);