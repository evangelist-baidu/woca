if( !navigator.userAgent.match(/BlendUI/i) ){
    yl_blendUI="web";
	document.write('<script src="http://blendwenku.duapp.com/lib/BlendWebUI.js"></script>');
}else{
    yl_blendUI="native";
    document.write('<script src="http://blendwenku.duapp.com/lib/zepto.js"></script>');
    document.write('<script src="http://blendwenku.duapp.com/lib/fastclick.js"></script>');
//	document.write('<script src="../lib/BlendHybridUI.js"></script>');
	document.write('<script src="http://blendwenku.duapp.com/lib/BlendHybridUI.js"></script>');
}

document.write('<script src="http://weinre123.duapp.com/target/target-script-min.js#">'+location.host+'</script>');


//if( !navigator.userAgent.match(/BlendUI/i) ){
//    document.write('<script src="../../blendwenku/lib/BlendWebUI.js"></script>');
//}else{
//    document.write('<script src="../../blendwenku/lib/zepto.js"></script>');
//    document.write('<script src="../../blendwenku/lib/fastclick.js"></script>');
////	document.write('<script src="../../blendwenku/lib/BlendHybridUI.js"></script>');
//    document.write('<script src="../../blendwenku/lib/BlendHybridUI.js"></script>');
//}