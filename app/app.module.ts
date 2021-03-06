import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { EventsAppComponent } from './events-app.component'
import { NavbarComponent } from './nav/navbar.component'
import { appRoutes } from './routes'
import { Error404Component} from './errors/404.component'
import { AuthService } from './user/auth.service'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator,
    EventResolver
} from './events/index'

import {
    CollapsibleWellComponent,
    TOASTR_TOKEN,
    Toastr,
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective
} from './common/index'

declare let toastr: Toastr
declare let jQuery: Object

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
        ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavbarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
        ],
    providers: [
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        {
            provide: JQ_TOKEN,
            useValue: jQuery
        },
        EventResolver,
        EventListResolver,
        { 
            provide: 'canDeactivateCreateEvent', 
            useValue: checkDirtyState
        },
        AuthService,
        VoterService
        ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent){
    if(component.isDirty)
        return window.confirm('You haven\'t saved this event,do you really want to cancel?')
    return true
}