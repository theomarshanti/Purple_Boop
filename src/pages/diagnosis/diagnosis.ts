import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';

import * as _ from 'lodash';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-diagnosis',
  templateUrl: 'diagnosis.html'
})
export class DiagnosisPage {
	@ViewChild(Nav) navi: Nav;
	
	selectedColor: any;
	severity: any;
	text: any;
	imageSRC: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private socialSharing: SocialSharing) {
		this.selectedColor = navParams.get("selectedColor");
		this.imageSRC = navParams.get("image"); 
		if(this.selectedColor.name==="white"){
			this.severity = navParams.get("severity");
			this.text = navParams.get("text");
		}
		else{
			console.log("name of color is: ", this.selectedColor.name)
			let _resp = this.extractJsonInfo(navParams.get("response"));
			this.severity=_resp[0]
			this.text = _resp[1]
			console.log("this.severity is set to : ", this.severity)
			console.log("this.text is set to : ", this.text)
		}
		console.log(this.imageSRC);
	}

	extractJsonInfo(_json){
		console.log("eJI called with: ", _json);
		let _a = [_json["severity"], _json["response"]];
		console.log("_a is: ", _a);
		return _a
	}

	shareMe(){
		var options = {
			message: `${this.text} Here is the url to the photo: ${this.imageSRC}`, // not supported on some apps (Facebook, Instagram)
			subject: 'the subject', // fi. for email
			//files: ['', ''], // an array of filenames either locally or remotely
			//url: `${this.imageSRC}`,
			chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
		  } 

		this.socialSharing.shareWithOptions(options);
	}

	backToRoot(){
		this.navCtrl.popToRoot();
	}


	 onSuccess(result) {
		console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
		console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
	  }
	  
	  onError(msg) {
		console.log("Sharing failed with message: " + msg);
	  }

	 options = {
		message: 'share this', // not supported on some apps (Facebook, Instagram)
		subject: 'the subject', // fi. for email
		files: ['', ''], // an array of filenames either locally or remotely
		url: '',
		chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
	  }
}