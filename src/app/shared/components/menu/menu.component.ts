import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-menu',
    templateUrl:'./menu.component.html',
    styleUrls:['./menu.component.css']
})
export class MenuComponent implements OnInit{

    isShow:boolean = false;

    ngOnInit(): void {
     }

     public toggle(){
         this.isShow = !this.isShow;
     }

}