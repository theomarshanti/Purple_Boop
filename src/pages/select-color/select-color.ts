import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { SelectTexturePage } from '../select-texture/select-texture';
import * as _ from 'lodash';

@Component({
  selector: 'page-select-color',
  templateUrl: 'select-color.html'
})
export class SelectColorPage {
	// @ViewChild(Nav) navi: Nav;
	// colors: Array<{hex:string, name:string}>;
	// selectedColor: {hex:string, name:string};
	colors: Array<any>;
	selectedColor: any = null;
	borderColors = {}; //Note the key has no # but the result does.

	constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
		db.list<any>('/Colors').valueChanges().subscribe(_rawcolors=>
		{
			this.colors = _rawcolors;
			this.setBorderColors(this.colors);
		})

		//this.navCtrl.setRoot(SelectColorPage);
	}

	onClick(color){
		this.selectedColor= (this.selectedColor===color)?null:color;
	}

	
	setBorderColors(_colors){
		_.map(_colors, color=>{ 
			this.borderColors[color.hex.substring(1)]=this.getBorderColor(color.hex);
		});
	}

	getBorderColor(hex){
		switch(hex){
			case("#48A774"):
				return "#289754";
			case("#882119"):
				return "#660109";
			case("#F5D88E"):
				return "#D5A85E";
			default:
				return hex;
		}
	} 

	onClickContinue(){
	    this.navCtrl.push(SelectTexturePage, {selectedColor:this.selectedColor.hex, borderColor:this.getBorderColor(this.selectedColor.hex)});
	}

	

	
}