document.addEventListener("blendready",function() {

    var main = Blend; // notice it!

    //======== in blend ===========


    //========== in blend end ===========

    // var api = main.api.layer;

    var api = main.api;//

    initCard();


    // FastClick.attach(document.body);//在chrome的touch下面 失灵，所以暂时禁掉
    //if(main.api.getLayerId()!=0) return;
    main.start("0", function(dom){
        var LayerGroup = main.LayerGroup;
        var Layer = main.Layer;
        // var api = main.api.layer;

        var cards = [];
        for(var i=0;i<cardNum;i++) {
            cards.push({id:i+1,url:'direction.html'});
        }

        cards[activeCardId-1]['active'] = true;

        tabs = new LayerGroup({
            id: "tab",
            layers: cards,
            onshow: function(event) {
                if(endGame()){
                    return;
                };
                console.log("onshow start");
                var id = event['detail'];
                var element = event['srcElement'];

                doScore(id,element);
                updateCardDisplay(id,element);
            },
            left: 0,
            top: 100
        });

        //退出
        main.on("backPressedBeforeExit",function(e){
            if(window.confirm("确定要退出吗?")){
                main.api.core.exitApp();
            }
        });

        main.start(activeCardId,function(dom){
            console.log(" start "+activeCardId);

            updateCardDisplay(activeCardId,dom);
        });
    });

    function initCard(reInit) {
        cardNum=4;
        activeCardId = cardNum/2;

        sessionStorage.setItem('score',0);
        sessionStorage.setItem('lastId',0);

        if(reInit) {
            level++;
        }else{
            level = 0;
        }

        releaseTime = 20;
        baseScore = 5;
        targetScore = baseScore + level*2;

        if(typeof tabs !== "undefined") {
            tabs.active(activeCardId);
        }

        $('#time').html(releaseTime);
        $('#targetscore').html(targetScore);
        $('#score').html(sessionStorage.getItem('score'));


        if(typeof timeHandler == "undefined") {
            timeHandler = setInterval(updateTime,1000);
        }
    }

    function updateCardDisplay(id,element) {
        var dir = Math.random() > 0.5 ? 1 : -1;
        sessionStorage.setItem('direction',dir);
        sessionStorage.setItem('lastId',id);

        $("#dir"+dir,element).css("color","red");
        $("#dir"+(-1*dir),element).css("color","black");
    };

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
        if(releaseTime <= 0 || sessionStorage.getItem("score") < 0) {
            alert("Game over!\n点击确定，重新开始游戏！");
            initCard();

            return true;
        }

        return false;
    }

});

