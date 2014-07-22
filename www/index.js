document.addEventListener("blendready",function() {

    flag_log(debug_layer,"blendready");

    var main = Blend.ui; // notice it!

    cardNum=10;
    activeCardId = cardNum/2;
    imgNum = 6;
    imgLibraryNum = 8;

    main.layerInit("0", function(dom){
        flag_log(debug_layer,"layerinit 0");

        initCard();
        localStorage.clear();

        var LayerGroup = main.LayerGroup;
        var cards = [];

        for(var i=0;i<cardNum;i++) {
            cards.push({id:String(i+1),url:'direction.html'});//,autoload:true
        }
        cards[activeCardId - 1]['active'] = true;

        tabs = new LayerGroup({
            id: "tab",
            layers: cards,
            onshow: function(event) {
                flag_log(debug_layer,"onshow",event['detail']);
                flag_log(debug_run,"onshow",event['detail']);

                var id = event['detail'];

                if(endGame()){
                    return;
                };

                localStorage.setItem("onshow"+id,1);
                run(id);
            },
            left: 0,
            top: 70
        });

        main.on("runGame",function(event){

            flag_log(debug_fire,"run event after",event.data.id);//,main.getLayerId()
            run(event.data.id);
        });

        function run(id) {
            var onloadFlag = localStorage.getItem("onload"+id);

            if(!localStorage.getItem("onload"+id)) {
                flag_log(debug_run,"onload"+id,'unfinish');
                return;
            }

            if(!localStorage.getItem("onshow"+id)) {
                flag_log(debug_run,"onshow"+id,'unfinish');
                return;
            }

            doScore(id);
            flag_log(debug_fire,"start fire updateEvent");
            main.fire("updateCardEvent",id,{"id":id});
        }

        $("#pauseBtn").click(function(e){
//            if(typeof timeHandler == "undefined") {
//                timeHandler = setInterval(updateTime,1000);
//            } else {
//                clearTimeout(timeHandler);
//                timeHandler = undefined;
//
//                //display help page
//            }

            openGameDesc();
        });

        function initCard(reInit) {
            flag_log(debug_layer,"initCard");

            if(reInit) {
                level++;
            }else{
                level = 0;

            }
            localStorage.setItem('lastId',0);
            score = 0;
            releaseTime = 3000;
            baseScore = 3;
            targetScore = baseScore + level*2;

            if(typeof tabs !== "undefined") {
                tabs.active(activeCardId);
            }

            initScorePanel();

            if(typeof timeHandler == "undefined") {
                timeHandler = setInterval(updateTime,1000);
            }
        }

        function initScorePanel() {
            $('#level').html(level+1);
            $('#time').html(releaseTime);
            $('#score').html(score+'/'+targetScore);
        }

        function doScore(cardId){
            var lastId = localStorage.getItem('lastId');
            flag_log(debug_card,"doscore lastid",lastId,'cardId',cardId);
            if(!lastId || lastId == cardId) {
                return;
            }

            flag_log(debug_score,'start score. lasterId is',lastId);

            var runDir = cardId - lastId >=0 ? 1 : -1;
            flag_log(debug_score,'direction',localStorage.getItem("direction"));
            var rightDir = localStorage.getItem("direction");

            runDir == rightDir?score++:score--;
            flag_log(debug_score,'current socre',score);
            updateScoreDisplay();
        }

        function updateScoreDisplay() {
            flag_log(debug_score,"当前分数为",score);
            $('#score').html(score+'/'+targetScore);
            //...
        }

        function updateTime() {
            if(!endGame()) {
                releaseTime--;
                $('#time').html(releaseTime);
            }

        }

        function endGame() {
            //win
            if(targetScore <= score) {
                alert("You win!\n,点击确定，继续下一等级游戏！");
                initCard(1);

                return true;
            }

            //fail  || score < 0
            if(releaseTime <= 0 ) {
                alert("Game over!\n点击确定，重新开始游戏！");
                initCard();

                return true;
            }

            return false;
        }

        function openGameDesc() {
            alert("游戏规则说明:每幅图片都可以表示一个方向，按照出现次数最多的方向滑动屏幕！\n\n方向提示：箭头方向，动物朝向，左/右手");

        }

//        setTimeout(openGameDesc,1500);

    });

//    main.layerInit(String(activeCardId), function(dom){
//        flag_log(debug_layer,"main layerInit ",activeCardId);
//        updateCardDisplay();
//    });

//    updateCardDisplay();

    (function(){
        var id = main.getLayerId();
        localStorage.setItem('onload'+id,1);
        main.fire("runGame",0,{"id":id});
        flag_log(debug_run,'onload finish',id);
    })();


    function updateCardDisplay() {
        var id =(typeof main.getLayerId == "undefined") ? 6 : main.getLayerId();

        flag_log(debug_card,'lastId',id);

        if(localStorage.getItem('lastId') == id) {
            flag_log(debug_card,'return for equal',id);
            return;
        }

        var dir;
        if(id <= 3) {
            dir = 1;
        } else if(id >= cardNum-2) {
            dir = -1;
        } else {
            dir = Math.random() > 0.5 ? 1 : -1;
        }

        localStorage.setItem('direction',dir);
        localStorage.setItem('lastId',id);

        var rightDirName= dir == 1 ? "right":"left";
        var wrongDirName= dir == 1 ? "left":"right";

        var indexSel = parseInt(Math.random() * imgNum);
        var startIndex = parseInt(Math.random()*imgLibraryNum);
        for(var i=0;i<imgNum;i++) {
            var imgSrc = i == indexSel ? "img/direction/"+rightDirName+"/"+startIndex+".jpg" :"img/direction/"+wrongDirName+"/"+startIndex+".jpg" ;
            $("#img"+i).attr("src",imgSrc);
            startIndex = (startIndex + 1)%imgLibraryNum;
        }
    };


    main.on("updateCardEvent",function(event){

        flag_log(debug_fire,"fire updateEvent after",event.data.id);//,main.getLayerId()
        var eventCardId = event.data.id;

        flag_log(debug_layer,"updateCardEvent"+"real",eventCardId);

        updateCardDisplay();
    });


});

debug_flag = 0;

debug_alert = 1;
debug_console_log = 0;

debug_layer = 0;
debug_card = 0;
debug_score = 0;
debug_storge = 0;
debug_fire= 0;
debug_run= 0;

function flag_log(){
    try{
        if(debug_flag && arguments.length > 0 && arguments[0]) {
            var str ='yl_debug';
            for(var i = 1;i < arguments.length;i++) {
                str += ',' + arguments[i];
            }
            debug_alert && alert(str);
            debug_console_log && console.log(str);
        }
    }catch(e){
        alert("flag_log error! "+arguments[1]);
    }

}


