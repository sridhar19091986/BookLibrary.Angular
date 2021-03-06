import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TitleComponent } from './title/title.component';
import { BackToTopComponent } from './backtotop/backtotop.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { MenuComponent } from './layout/menu.component';
import { CategoryLabelComponent } from './categorylabel/categorylabel.component';
import { ToastModule } from './toast/toast.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ModalModule } from './modal/modal.module';
import { ExceptionService } from './exception.service';
import { BaseService } from './base.service';
import { EntityService } from './entity.service';
import { GridModule } from './grid/grid.module';
import { CategoryDirective } from "./directives/category.directive";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToastModule,
        SpinnerModule,
        ModalModule
    ],
    declarations: [
        TitleComponent,
        BackToTopComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        CategoryLabelComponent,
        CategoryDirective
    ],
    exports: [
        TitleComponent,
        BackToTopComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        CategoryLabelComponent,
        ToastModule,
        SpinnerModule,
        ModalModule,
        GridModule,
        CategoryDirective
    ],
    providers: [
        ExceptionService,
        BaseService, 
        EntityService
    ]
})
export class CoreModule {

}
