function TestKnowledge(data , root) {

	this.root = $(root);
	this.arr = data;
	this.idQuestion = data.questions[0].id; // id кнопки активного вопроса
	this.objAnswers = {}; // варианты ответов выбранные пользователем  
	this.questionTimes = {globalTime: null , previousId: data.questions[0].id}; // значение времен для ответа на вопрос, время начала теста, id пердыдущего вопроса
	this.timerLocal = this.timerLocal; // переменная setTimeout таймеров
	this.timerMain; // переменныая setTimeout таймеров
	this.render();
}

TestKnowledge.prototype = {

	render: function() {
		this.root.empty();
		this.renderOpening();
		this.renderTest();
		this.setEventStartBtn();
	},
	renderOpening: function() {

		var text = "Вам предлагается пройти тест. Слева от панели с номерами вопросов находится главный таймер, указывающий время, оставшееся на прохождение теста. Под главным таймером находится таймер с указанием времени оставшегося для ответа на текущий вопрос. Для удобства навигации кнопки с посещенными, но неотвеченными вопросами будут подсвечены желтым,  кнопки с посещенными и отвеченными вопросами будут подсвечены зеленым, кнопки с неотвеченными вопросами и истекшим временем на ответ будут подсвечены красным."  +
	          "<br>По истечении времени на прохождение теста Ваши ответы будут отправлены автоматически!"

		var header = $("<div id='header' class='row page-header'>").appendTo(this.root);

		$("<h3 class='text-center'>").html(this.arr.titleText).appendTo(header);

		var opening = $("<div id='startblock' class='row'>").appendTo(this.root);

		$("<div class='col-xs-1 col-lg-2'>").appendTo(opening);
		var openText = $("<div class='col-xs-10 col-lg-8 panel'>").appendTo(opening);
		$("<div class='col-xs-1 col-lg-2'>").appendTo(opening);
		$("<div  class='panel-heading bg-info text-justify'>").html(text).appendTo(openText);
		$("<div id='start' class='btn btn-block btn-primary panel-body' data-toggle='collapse' data-target='#main'>").html("Начать тест!").appendTo(openText);

	},
	renderTest: function(){
	// общий блок
		var mainBlok = $("<div class='row'>").appendTo(this.root);
		$("<div class='col-xs-1 col-lg-2'>").appendTo(mainBlok);
		$("<div id='main' class='col-xs-10 col-lg-8 collapse'>").appendTo(mainBlok);
		$("<div class='col-xs-1 col-lg-2'>").appendTo(mainBlok);

		// таймер главный, кнопки вопросов, отправить,

		$("<div id='header_1' class='row'>").appendTo("#main");
		$("<div id='timer-main' class='col-xs-2 center-block'>").appendTo("#header_1");
		$("<p class='text-center'>").appendTo("#timer-main");
		$("<div id='quest-list' class='col-xs-8  panel panel-default'>").appendTo("#header_1");

		var send = $("<div class='col-xs-2'>").appendTo("#header_1");
		$("<button id='send-button' type='button' class='btn btn-default center-block'>").text("Отправить!").appendTo(send);


		// таймер вопросов, блок вопросв ответов, навигация
		$("<div id='main-block' class='row'>").appendTo("#main");

		$("<div id='timer-local' class='col-xs-2'>").appendTo("#main-block");
		$("<div id='quest-answer-block' class='col-xs-8'>").appendTo("#main-block");
		$("<div  class='col-xs-2'>").appendTo("#main-block");

		$("<p class='text-center'>").appendTo("#timer-local");

		$("<div id='div_border' class='row panel panel-default'>").appendTo("#quest-answer-block");
		$("<div id='quest-text' class='panel-heading'>").appendTo("#div_border");
		$("<div id='answers' class='panel-body'>").appendTo("#div_border");

		$("<div id='buttons' class='row'>").appendTo("#quest-answer-block");
		var btn  = $("<button class='btn btn-default' style='float:left'>").appendTo("#buttons");
		$("<span class='glyphicon glyphicon-chevron-left'>").appendTo(btn);
		$("<span>").text("Предыдущий вопрос").appendTo(btn);
		btn  = $("<button class='btn btn-default' style='float:right'>").text("Следующий вопрос").appendTo("#buttons");
		$("<span class='glyphicon glyphicon-chevron-right'>").appendTo(btn);

	},

	startTest: function() {
		$("#startblock").empty();
		this.arrQuestionTime();
		this.createQuestionsButtons();
		this.setEventQuestionsButton();
		this.setEventNavigationBatton();
		this.setEventSendBatton();
		this.fillQuestionArea (this.arr.questions[0].question);
		this.fillAnswerArea (this.arr.questions[0]);
		this.questionTimes.globalTime = Date.now();
		this.localTimer ();
		this.mainTimer();
	},

	arrQuestionTime: function() {       // формеруем массив с значением времени для каждого вопроса
		for (var i = 0 ; i < this.arr.questions.length ; i++) {
		var key = this.arr.questions[i].id;
		this.questionTimes[key] = this.arr.questions[i].time;
		}
	},

	createQuestionsButtons: function() { // Функция добавления кнопок вопросов
		$("#quest-list").empty();
		for (var i = 0 ; i < this.arr.questions.length ; i++) {	
		$("<button class='btn btn-default btn-sm'>").attr("id" , this.arr.questions[i].id).text(i+1).appendTo("#quest-list");	
		}
	},
	// НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ!!!
	setEventStartBtn: function(){
		document.getElementById ("start").addEventListener ( "click" ,this.startTest.bind( this ));
	},

	setEventQuestionsButton: function() { // назначаем обработчик на кнопки вопросов
		document.getElementById ("quest-list").addEventListener ( "click" , this.changQuestion.bind( this ));	
	},

	setEventNavigationBatton: function() { // назначаем обработчик на кнопки навигации

		var elem = document.getElementById("buttons").getElementsByTagName("button");
		var previous = elem[0];
		var next = elem[1];
		previous.addEventListener ( "click" , this.previousQuestion.bind( this ));
    	next.addEventListener ( "click" , this.nextQuestion.bind( this ));
	},

	setEventSendBatton: function() { // назначаем обработчик на кнопку отправить

		document.getElementById("send-button").addEventListener("click" , this.checkTimeAndResult.bind( this ));
	},


	// ОБРАБОТЧИКИ!!!
	 changQuestion: function(event , idChang) { // обработчик кнопок вопросов

 		if ((event.target.tagName.toLowerCase() == 'button') || (event.target.tagName.toLowerCase() == 'span')) {
 		this.rememberResult();
 		// задаем id для findQuestion, или прилетает от текущего idQuestion или целевое значение по клику
 		(idChang) ? this.idQuestion = idChang : this.idQuestion = event.target.id;
 		this.findQuestion();
 		// вызываем таймер вопроса
		this.localTimer();
		}
	},

	previousQuestion: function() { // обработчик функция пред. вопроса
		var e = document.getElementById(this.idQuestion);
		if (e.previousElementSibling) {
   			this.changQuestion(event , e.previousElementSibling.id);
		} else {
	 		this.changQuestion(event , this.idQuestion);
		}
	},

	nextQuestion: function() { // обработчик функция след. вопроса

		var e = document.getElementById(this.idQuestion);
		if (e.nextElementSibling) {
    		this.changQuestion(event , e.nextElementSibling.id);
		} else {
			this.changQuestion(event , this.idQuestion);
		}
	},

	checkTimeAndResult: function() { // обработчик кнопки отправик результата

		this.rememberResult();

		if (this.questionTimes.globalTime == false) {
			clearTimeout(this.timerMain);
			clearTimeout(this.timerLocal);

			alert ("Время на прохождение теста истекло! Ваши результаты отпавленны!");

		} else {
			var check =false;
			var objAnswersLength = 0;
			for ( var key in  this.objAnswers) {
				objAnswersLength++;
			}
			if (this.arr.questions.length == objAnswersLength){
					check = true;
				for (var propName  in this.objAnswers) {
					var arrLength = this.objAnswers[propName].length;
					if ( ((arrLength == 0) && this.questionTimes[propName] ) ) {
						check = false;
					}
				}
			}
			if (!check ) var isNoAnswers = confirm("У вас есть неотвеченные вопросы. Хотите отправить результаты?");
			if (!isNoAnswers && !check) return;
			this.disabled(true);
			clearTimeout(this.timerMain);
			clearTimeout(this.timerLocal);
			alert ("Ваши результаты отпавленны!");
		}
	},
// ___________________________________________________________

	rememberResult: function() { // запоминаем ответы, цвет кнопок

  		var inputFeald = document.getElementById("answers").getElementsByTagName("input");
  		this.objAnswers[this.idQuestion] = [];
  		var check = false;
		for (var j = 0 ; j < inputFeald.length; ++j) {

	    	if ((inputFeald[j].type == "radio" || inputFeald[j].type == "checkbox") && inputFeald[j].checked && inputFeald[j].name == "choice") {
	    		this.objAnswers[this.idQuestion].push(inputFeald[j].id);
	    		check = true;
	    	}
		}

		if (check)  $("#"+this.idQuestion).attr("class" , "btn btn-sm btn-success");
		if (!check && this.questionTimes[this.idQuestion]) $("#"+this.idQuestion).attr("class" , "btn btn-sm btn-warning");
		if (!check && !this.questionTimes[this.idQuestion]){
			$("#"+this.idQuestion).attr("class" , "btn btn-sm btn-danger");
		}
		console.log (this.objAnswers);
	},

	findQuestion: function() { // находим вопрос по занчению id
	
		for (var i = 0 ; i < this.arr.questions.length ; ++i) {
			var questId = this.arr.questions[i].id;
			if (questId === this.idQuestion) {
			// вызываем функции заполнения поля вопросов ответов
				this.fillQuestionArea (this.arr.questions[i].question);
				this.fillAnswerArea (this.arr.questions[i]);
				break;
			}
		}	
	},

	fillQuestionArea: function(questionText) { // заполняем поле вопроса

		$("#quest-text").html(questionText);
	},

	fillAnswerArea: function(question) { // заполняем поле ответа
		var randomArr = [];
		for (var z = 0 ; z < question.options.length; z++){
			randomArr.push(z);
		}

		$("#answers").empty();
		var ul = $("<ul>").attr("dataType" , question.type).attr("id" , "ul").appendTo($("#answers"));
		for (var j = 0 ; j < question.options.length ; j++) {
			var li = $("<li>").appendTo(ul);

			var n = Math.floor(Math.random() * (randomArr.length));

			var input = $("<input>").attr("id" , question.options[randomArr[n]].id).attr("type" , "radio").attr("name" , "choice").appendTo(li);
			if (question.type =="single" ) {
				$(input).attr("type" , "radio");
			} else {
				$(input).attr("type" , "checkbox");		
			}
			if (this.objAnswers[this.idQuestion]) {
				for (var i = 0 ; i < this.objAnswers[this.idQuestion].length ; i++) {
	         		if (question.options[randomArr[n]].id == this.objAnswers[this.idQuestion][i]){
	         			$(input).attr("checked" , "");
	         		}
				}
			}
			$("<label>").attr("for" , question.options[randomArr[n]].id).html(question.options[randomArr[n]].text).appendTo(li);
			randomArr.splice(n , 1);
		}	
	},

	// ТАЙМЕРЫ
	mainTimer: function() { // таймер главный

		var e = $("#timer-main>p");
		var timeEnd = Date.now() + this.arr.time;
	    setTimeout (tic , this.arr.time%1000);
	    var self = this;
	 	function tic() { 
	 		var timeCount = timeEnd - Date.now();
	 		var timeInSec = Math.round(timeCount/1000);
	 		var sec = timeInSec%60;
	 		var min = (timeInSec - sec)/60;
	 		var timerText =  min + ":" + sec;
	 		if (min<10) timerText = "0" + timerText;
	 		if (sec < 10) timerText =  min + ":" + "0" +sec;
	 		if (min<10 && sec<10) timerText =  "0" + min + ":" + "0" +sec;
	 		(min<1) ? $(e).attr("class", "text-center text-danger") :$(e).attr("class", "text-center");
	  		if (timeInSec < 0) {
	  			self.disabled(true);
	  			$(e).empty().text("00:00");
	  			self.questionTimes.globalTime = false;
	  			self.allTimeIsOver();
	  			self.checkTimeAndResult();
	  			clearTimeout(self.timerLocal);
	  		 	return;
	  		 } else {

	  		  	$(e).empty().text(timerText);
	  		}
	  		clearTimeout(self.timerMain);
	  		self.timerMain = setTimeout (tic , 1000);
	 	}
	},

	localTimer: function() { // таймер для вопросов
		var e = $("#timer-local>p");
		var start = (Date.now() - this.questionTimes.globalTime);
	 	if (this.questionTimes[this.questionTimes.previousId]) this.questionTimes[this.questionTimes.previousId] = this.questionTimes[this.questionTimes.previousId] - start;
	 	this.questionTimes.previousId = this.idQuestion;
	 	this.questionTimes.globalTime = Date.now();
	 	var timeEnd =  Date.now() + this.questionTimes[this.idQuestion];
	 	clearTimeout(this.timerLocal);
 	 	setTimeout (tic, this.questionTimes[this.idQuestion]%1000);
 	 	var self = this;
 		function tic() {
 			var timeCount = timeEnd - new Date;
 		    var timeInSec = Math.round(timeCount/1000);
 			var sec = timeInSec%60;
 			var min = (timeInSec - sec)/60;
 			var timerText =  min + ":" + sec;
 			if (min<10) timerText = "0" + timerText;
 			if (sec < 10) timerText =  min + ":" + "0" +sec;
 			if (min<10 && sec<10) timerText =  "0" + min + ":" + "0" +sec;
 			(min<1) ? $(e).attr("class", "text-center text-danger") :$(e).attr("class", "text-center");
 			if (timeInSec  < 0) {
 				self.disabled(false);
 				$(e).empty().text("00:00");				
 				self.questionTimes[self.idQuestion] = false;
 				self.rememberResult();
 				self.timeIsOver();
 				return;
 			} else {	
  				$(e).text(timerText);
   			}
   			clearTimeout(self.timerLocal);
   			self.timerLocal = setTimeout(tic , 1000);
 		}
	},

	disabled: function(a) { // дизаблед, принимает true or false, заблокировать все или текший вопрос
	 	if (a) {
	 		$("button").attr("disabled" , "");
	 		$("#ul>li>input").attr("disabled" , "");
	 		$("#" + this.idQuestion).attr("disabled" , "");	
	 	} else {
	 		if (!this.questionTimes.globalTime) $("button").attr("disabled" , "");
	 		$("#ul>li>input").attr("disabled" , "");
	 		$("#" + this.idQuestion).attr("disabled" , "");
	 	}
	},

	timeIsOver: function() {  //вызывается в таймере вопросов по окончанию времени, не обязательные, можно отменить
		$("<div class='text-center btn-danger'>").text("Время для ответа на вопрос истекло!").appendTo("#answers");
	},

	allTimeIsOver: function(){ //вызывается в таймере вопросов по окончанию времени, не обязательные, можно отменить
		$("<div class = 'text-center btn-danger'>").text("Время на прохождение теста истекло!").appendTo("#div_border");
	}
} 	









