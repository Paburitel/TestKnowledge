var data = {

	questions : 
		[
			{id : "question1",
			 question : "Как задать заголовок страницы (подпись закладки)?",
			 type : "single",

			 options :[ 
			 	{
			 		text : "<pre>...<br>  &lt;head&gt;<br>    &lt;title&gt;Заголовок&lt;title&gt;<br>  &lt;/head&gt;</pre>",
			 		id : "answer1_1"
			 	},
			 	{
			 		text : "<pre>&lt;head title=&quot;Заголовок&quot;&gt;...&lt;/head&gt;</pre>",
			 		id : "answer1_2"
			 	},
			 	{
			 		text : "<pre>&lt;head name=&quot;Заголовок&quot;&gt;...&lt;/head&gt;</pre>",
			 		id : "answer1_3"
			 	}
			 	],
			 time : 90000
			},

			{id : "question2",
			 question : "Как подключить CSS? ",
			 type : "single",

			 options : [
			 	{
			 		text : "<pre>&lt;link rel=&quot;stylesheet&quot; type=&quot;css/text&quot; href=&quot;style.css&quot;&gt;</pre>",
			 		id : "answer2_1"
			 	},
			 	{
			 		text : "<pre>&lt;link href=&quot;stylesheet&quot; type=&quot;text/css&quot; rel=&quot;style.css&quot;&gt;</pre>",
			 		id : "answer2_2"
			 	},
			 	{
			 		text : "<pre>&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;style.css&quot;&gt;</pre>",
			 		id : "answer2_3"
			 	},
			 	{
			 		text : "<pre>&lt;link href=&quot;stylesheet&quot; type=&quot;css/text&quot; rel=&quot;style.css&quot;&gt;</pre>",
			 		id : "answer2_4"
			 	}

			 	],
			 	time : 90000
			},

			 {id : "question3",
			  question : "Как задать несколько классов на элементе?",
			  type : "single",

			  options : [
			  	{
			 		text : "<pre>&lt;div class=&quot;first&quot; class=&quot;second&quot;&gt;...&lt;/div&gt;</pre>",
			 		id : "answer3_1"
			 	},
			 	{
			 		text : "<pre>&lt;div class=&quot;first&quot; , &quot;second&quot;&gt;...&lt;/div&gt;</pre>",
			 		id : "answer3_2"
			 	},
			 	{
			 		text : "<pre>&lt;div class=&quot;first&quot; ; &quot;second&quot;&gt;...&lt;/div&gt;</pre>",
			 		id : "answer3_3"
			 	},
			 	{
			 		text : "<pre>&lt;div class=&quot;first second&quot;&gt;...&lt;/div&gt;</pre>",
			 		id : "answer3_4"
			 	}
			 	],
			 time : 90000
			},
			{id : "question4",
			  question : "Допустимые элементы width в CSS?",
			  type : "multi",

			  options : [
			  	{
			 		text : "px, %, em",
			 		id : "answer4_1"
			 	},
			 	{
			 		text : "mm, cm, in",
			 		id : "answer4_2"
			 	},
			 	{
			 		text : "pt",
			 		id : "answer4_3"
			 	},
			 	{
			 		text : "Без единиц измерения.",
			 		id : "answer4_4"
			 	}
			 	],
			 time : 90000
			},
			{id : "question5",
			  question : "Расположите в порядке изнутри наружу элементы блока (модель формирования блока box-sizing: content-box)",
			  type : "single",

			  options : [
			  	{
			 		text : "[размер],padding,border,margin",
			 		id : "answer5_1"
			 	},
			 	{
			 		text : "padding,[размер],border,margin",
			 		id : "answer5_2"
			 	},
			 	{
			 		text : "[размер],margin,border,padding",
			 		id : "answer5_3"
			 	},
			 	{
			 		text : "margin,[размер],border,padding",
			 		id : "answer5_4"
			 	}
			 	],
			 time : 90000
			},
			{id : "question6",
			  question : "Какие теги влияют <b>только</b> на визуальное оформление?",
			  type : "single",

			  options : [
			  	{
			 		text : "&lt;header&gt;, &lt;footer&gt;, &lt;article&gt;",
			 		id : "answer6_1"
			 	},
			 	{
			 		text : "&lt;nav&gt;, &lt;main&gt;, &lt;aside&gt;",
			 		id : "answer6_2"
			 	},
			 	{
			 		text : "&lt;b&gt;, &lt;i&gt; , &lt;u&gt;",
			 		id : "answer6_3"
			 	},
			 	{
			 		text : "&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;",
			 		id : "answer6_4"
			 	}
			 	],
			 time : 90000
			}
		],
	titleText: "Входное тестирование по HTML и CSS",
	time: 540000,
	url : ""
};