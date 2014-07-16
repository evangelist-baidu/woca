if( !navigator.userAgent.match(/BlendUI/i) ){
	document.write('<script src="../lib/BlendWebUI.js"></script>');
}else{
    document.write('<script src="../lib/zepto.js"></script>');
    document.write('<script src="../lib/fastclick.js"></script>');
	document.write('<script src="../lib/BlendHybridUI.js"></script>');
}
