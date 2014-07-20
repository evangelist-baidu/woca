document.addEventListener("blendready",function() {

//    alert("blendready");

    var main = Blend.ui; // notice it!

    cardNum=10;
    activeCardId = cardNum/2;
    imgNum = 6;

    onShowId = activeCardId;

    main.layerInit("0", function(dom){
        alert("layerinit 0");

        initCard();

        var LayerGroup = main.LayerGroup;
        var cards = [];

        for(var i=0;i<cardNum;i++) {
            cards.push({id:String(i+1),url:'direction.html'});
        }
        cards[activeCardId - 1]['active'] = true;

        tabs = new LayerGroup({
            id: "tab",
            layers: cards,
            onshow: function(event) {
                alert("onshow");

//                if(endGame()){
//                    return;
//                };
                console.log("layer group onshow start");

                onShowId = event['detail'];
//                var element = event['srcElement'];

//                doScore(id,element);

                main.fire("updateCardEvent",false,{"id":onShowId});
            },
            left: 0,
            top: 100
        });

//        main.layerInit(activeCardId,function(dom){
//            console.log(" start "+activeCardId);
//
//            updateCardDisplay(activeCardId,dom);
//        });

        $("#stopBtn").click(function(e){
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
            alert("initCard");
            run=false;

            if(reInit) {
                level++;
            }else{
                level = 0;
                sessionStorage.setItem('lastId',0);
            }

            releaseTime = 50000000;
            baseScore = 5;
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
            $('#targetscore').html(targetScore);
            $('#score').html(sessionStorage.getItem('score'));
        }

        function doScore(cardId,element){
            var lastId = sessionStorage.getItem('lastId');
            if(lastId == 0) {
                return;
            }

            var runDir = cardId - lastId >=0 ? 1 : -1;
            var rightDir = sessionStorage.getItem("direction");

            var score = sessionStorage.getItem('score');
            runDir == rightDir?score++:score--;
            sessionStorage.setItem('score',score);
            updateScoreDisplay();

        }

        function updateScoreDisplay() {
            var score = sessionStorage.getItem('score');
            $('#score').html(score);
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
            if(targetScore <= sessionStorage.getItem("score")) {
                alert("You win!\n,点击确定，继续下一等级游戏！");
                initCard(1);

                return true;
            }

            //fail
//        if(releaseTime <= 0 || sessionStorage.getItem("score") < 0) {
//            alert("Game over!\n点击确定，重新开始游戏！");
//            initCard();
//
//            return true;
//        }

            return false;
        }

        function openGameDesc() {
            alert("游戏规则说明");

        }

    });

    main.layerInit(String(activeCardId), function(dom){
        alert("main layerInit "+activeCardId);
        updateCardDisplay();
    });

    function updateCardDisplay() {
        var id = (typeof main.getLayerId == "undefined") ? onShowId : main.getLayerId();
        alert("aaaa "+ id);

        var dir;
        if(id == 1) {
            dir = 1;
        } else if(id == cardNum) {
            dir = -1;
        } else {
            dir = Math.random() > 0.5 ? 1 : -1;
        }

        sessionStorage.setItem('direction',dir);
        sessionStorage.setItem('lastId',id);

        var rightDirName= dir == 1 ? "right":"left";
        var wrongDirName= dir == 1 ? "left":"right";

        var indexSel = parseInt(Math.random() * imgNum);

        for(var i=0;i<imgNum;i++) {
            var imgSrc = i == indexSel ? "img/direction/"+rightDirName+"/"+parseInt(Math.random() * imgNum)+".jpg" :"img/direction/"+wrongDirName+"/"+i+".jpg" ;
            $("#img"+i).attr("src",imgSrc);
        }
    };


    main.on("updateCardEvent",function(event){

        if(main.getLayerId() != event.data.id) {
            return;
        }
        alert("updateCardEvent");

        updateCardDisplay();
    });

});



