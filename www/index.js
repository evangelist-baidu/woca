document.addEventListener("blendready",function() {

    flag_alert(debug_layer,"blendready");

    var main = Blend.ui; // notice it!

    cardNum=10;
    activeCardId = cardNum/2;
    imgNum = 6;
    imgLibraryNum = 8;

    main.layerInit("0", function(dom){
        flag_alert(debug_layer,"layerinit 0");

        initCard();

        var LayerGroup = main.LayerGroup;
        var cards = [];

        for(var i=0;i<cardNum;i++) {
            cards.push({id:String(i+1),url:'direction.html',autoload:true});
        }
        cards[activeCardId - 1]['active'] = true;

        tabs = new LayerGroup({
            id: "tab",
            layers: cards,
            onshow: function(event) {
                flag_alert(debug_layer,"onshow",event['detail']);

                var id = event['detail'];

                if(endGame()){
                    return;
                };

                doScore(id);
                flag_alert(debug_fire,"start fire updateEvent");
                main.fire("updateCardEvent",id,{"id":id});
            },
            left: 0,
            top: 70
        });

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
            flag_alert(debug_layer,"initCard");

            if(reInit) {
                level++;
            }else{
                level = 0;

            }
            localStorage.setItem('lastId',0);
            score = 0;
            releaseTime = 20;
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
            $('#targetscore').html(targetScore);
            $('#score').html(score);
        }

        function doScore(cardId){
            var lastId = localStorage.getItem('lastId');
            flag_alert(debug_card,"doscore lastid",lastId,'cardId',cardId);
            if(lastId == 0 || lastId == cardId) {
                return;
            }

            flag_alert(debug_score,'start score. lasterId is',lastId);

            var runDir = cardId - lastId >=0 ? 1 : -1;
            flag_alert(debug_score,'direction',localStorage.getItem("direction"));
            var rightDir = localStorage.getItem("direction");

            runDir == rightDir?score++:score--;
            flag_alert(debug_score,'current socre',score);
            updateScoreDisplay();
        }

        function updateScoreDisplay() {
            flag_alert(debug_score,"当前分数为",score);
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
            alert("游戏规则说明:根据图片中显示的方向，选择出现次数最多的方向滑动屏幕！");

        }

    });

    main.layerInit(String(activeCardId), function(dom){
        flag_alert(debug_layer,"main layerInit ",activeCardId);
        updateCardDisplay();
    });

    function updateCardDisplay() {
        var id =(typeof main.getLayerId == "undefined") ? 6 : main.getLayerId();

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
        flag_alert(debug_card,'lastId',id);

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

        flag_alert(debug_fire,"fire updateEvent after",event.data.id);//,main.getLayerId()
        var eventCardId = event.data.id;

        flag_alert(debug_layer,"updateCardEvent"+"real",eventCardId);

        updateCardDisplay();
    });

});

debug_flag = 0;
debug_layer = 0;
debug_card = 0;
debug_score = 0;
debug_storge = 0;
debug_fire= 1;

function flag_alert(){
    if(debug_flag && arguments.length > 0 && arguments[0]) {
        var str ='';
        for(var i = 1;i < arguments.length;i++) {
            str +=  arguments[i].toString() + ' ';
        }
        alert(str);
    }
}


