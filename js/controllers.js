angular.module('PersonalIncomeTax', []).controller('PersonalIncomeTaxController', 
		function($scope) {
	         $scope.pit={
					mingxis:(function(){
	         		var mingxis = [];
	         		mingxis[0] = {
	         			name:'养老',
	         			gerenRate: 8,
	         			danweiRate: 20
	         		};
	         		mingxis[1] = {
	         			name:'医疗',
	         			gerenRate: 2,
	         			danweiRate: 10
	         		};
	         		mingxis[2] = {
	         			name:'失业',
	         			gerenRate: 0.2,
	         			danweiRate: 1
	         		};
	         		mingxis[3] = {
	         			name:'工伤',
	         			gerenRate: 0,
	         			danweiRate: 0.5
	         		};
	         		mingxis[4] = {
	         			name:'生育',
	         			gerenRate: 0,
	         			danweiRate: 0.8
	         		};
	         		mingxis[5] = {
	         			name:'公积金',
	         			gerenRate: 12,
	         			danweiRate: 10
	         		};
	         		return mingxis;
	         	})(),
	         	shuiqian:16000,
	         	shuihou:0,
	         	geshui:0,
	         	geren:0,
	         	danwei:0,
	         	history:[],
	         	yanglao: 0,
	         	yiliao:0,
	         	shiye:0,
	         	shengyu:0,
	         	gongjijin:0,
	         	getTax: function(){
	         		//计算个税
	         		this.yanglao = this.shuiqian * this.mingxis[0].gerenRate / 100;
	         		this.yiliao = this.shuiqian * this.mingxis[1].gerenRate / 100;
	         		this.shiye = this.shuiqian * this.mingxis[2].gerenRate / 100;
	         		this.gongshang = this.shuiqian * this.mingxis[3].gerenRate / 100;
	         		this.shengyu = this.shuiqian * this.mingxis[4].gerenRate / 100;
	         		this.gongjijin = this.shuiqian * this.mingxis[5].gerenRate / 100;
	         		var yingnashui = this.shuiqian - this.yanglao - this.yiliao - this.shiye - this.gongshang - this.shengyu - this.gongjijin - 3500;
	         		if(0 < yingnashui && yingnashui <= 1500){
	         			this.geshui = yingnashui * 3 / 100;
	         		}
	         		else if(1500 < yingnashui && yingnashui <= 4500){
	         			this.geshui = yingnashui * 10 /100 -105;
	         		}
	         		else if(4500 < yingnashui && yingnashui <= 9000){
	         			this.geshui = yingnashui * 20 / 100 - 555;
	         		}
	         		else if (9000 < yingnashui && yingnashui <= 35000){
	         			this.geshui = yingnashui * 25 / 100 - 1005;
	         		}
	         		else if(35000 < yingnashui && yingnashui <= 55000){
	         			this.geshui = yingnashui * 30 / 100 - 2755;
	         		}
	         		else if(55000 < yingnashui && yingnashui <= 80000){
	         			this.geshui = yingnashui * 35 / 100 - 5505;
	         		}
	         		else if(yingnashui > 80000){
	         			this.geshui = yingnashui * 45 / 1000 - 13505;
	         		}
	         		//计算税后
	         		this.shuihou = this.shuiqian - this.geshui;
	         		//个人、单位缴纳
	         		this.geren = this.geshui;
	         		this.danwei = this.shuiqian * (this.mingxis[0].danweiRate + this.mingxis[1].danweiRate  + this.mingxis[2].danweiRate  
	         			+ this.mingxis[3].danweiRate  + this.mingxis[4].danweiRate + this.mingxis[5].danweiRate) /100;
	         		//历史
	         		if(this.history.length === 0){
	         			this.history[0] = this.shuiqian;
	         		}
	         		else{
	         			this.history.unshift(this.shuiqian);
	         			if(this.history.length > 10){
	         				this.history.length = 10;
	         			}
	         		}
	         	},
	         	//反推税前
	         	getShuiqian: function(){
	         		var yingnashui;
	         		if(this.geshui > 0 && this.geshui <= 45){
	         			yingnashui = this.geshui / 0.03;
	         		}
	         		else if(this.geshui > 45 && this.geshui <= 345){
	         			yingnashui = (this.geshui - 45) / 0.1 + 1500;
	         		}
	         		else if(this.geshui > 345 && this.geshui <= 1245){
	         			yingnashui = (this.geshui - 345) / 0.2 + 4500;
	         		}
	         		else if(this.geshui > 1245 && this.geshui <= 7745){
	         			yingnashui = (this.geshui - 1245) / 0.25 + 9000;
	         		}
	         		else if(this.geshui > 7745 && this.geshui <= 13745){
	         			yingnashui = (this.geshui - 7745) / 0.3 + 35000;
	         		}
	         		else if(this.geshui > 13745 && this.geshui <= 22495){
	         			yingnashui = (this.geshui - 13745) / 0.35 + 55000;
	         		}
	         		else if(this.geshui > 22495){
	         			yingnashui = (this.geshui - 22495) / 0.45 + 80000 ;
	         		}
	         		this.shuiqian = (yingnashui + 3500) / (1 - (this.mingxis[0].gerenRate + this.mingxis[1].gerenRate  + this.mingxis[2].gerenRate  
	         			+ this.mingxis[3].gerenRate  + this.mingxis[4].gerenRate + this.mingxis[5].gerenRate) / 100)
	         		this.shuihou = this.shuiqian - this.geshui;
	         	}
	         };
	    });