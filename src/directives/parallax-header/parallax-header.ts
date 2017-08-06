import { Directive, ElementRef, Renderer } from '@angular/core';
 
@Directive({
  selector: '[parallax-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ParallaxHeader {
 
    header: any;
    headerHeight: any;
    translateAmt: any;
    scaleAmt: any;
    navbarBackground: any;
 
    constructor(public element: ElementRef, public renderer: Renderer){
 
    }
 
    ngOnInit(){
        this.navbarBackground = this.element.nativeElement.parentElement.children["0"]
            .getElementsByClassName("toolbar-background")["0"];
        
        let content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
        this.header = content.getElementsByClassName('header-image')[0];
        let mainContent = content.getElementsByClassName('main-content')[0];
 
        this.headerHeight = this.header.clientHeight;
 
        this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
        this.renderer.setElementStyle(this.header, 'background-size', 'cover');
        this.renderer.setElementStyle(mainContent, 'position', 'absolute');
 
    }
 
    onWindowResize(ev){
        this.headerHeight = this.header.clientHeight;
    }
 
    onContentScroll(ev){
 
        ev.domWrite(() => {
            this.updateParallaxHeader(ev);
        });
 
    }
 
    updateParallaxHeader(ev){
        
        if(ev.scrollTop >= 0){
            this.translateAmt = ev.scrollTop / 2;
            this.scaleAmt = 1;
        } else {
            this.translateAmt = 0;
            this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
        }
        if(this.translateAmt >= 80){
            this.renderer.setElementStyle(this.navbarBackground,
                 "background-color",
                 "rgba(0,0,0, 1)" );
        }else if(this.translateAmt > 50){
            this.renderer.setElementStyle(this.navbarBackground,
                 "background-color",
                 "rgba(0,0,0, 0.8)" );
            this.renderer.setElementStyle(this.navbarBackground,
                 "transition-timing-function",
                 "ease-out" );     
            this.renderer.setElementStyle(this.navbarBackground,
                 "transition",
                 "background-color 0.2s" );     
        }
        this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,'+this.translateAmt+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')');
 
    }
 
}