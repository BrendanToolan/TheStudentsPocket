import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-subject',
    templateUrl: './create-subject.page.html',
    styleUrls: ['./create-subject.page.scss'],
})
export class CreateSubjectPage implements OnInit {

    private errorMessage;

    constructor(private api: ApiService, public dialog: MatDialog, private router: Router) {
    }

    /**
     * @title Error message handle
     * @desc Functions are used to set and get error message for this component.
     */
    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    // End ======================================================================

    addSubject(form: NgForm) {
        this.api.addSubject(form.value.module_name, form.value.module_desc).subscribe(data => {
            if (data.status) {
                this.router.navigate(['/subject-overview']);
            } else if (data.errorCode === 'ER_DUP_ENTRY') {
                this.setErrorMessage('This subject already exists in your records');
            } else {
                this.setErrorMessage(data.message);
            }// end if else
        });
        // Display form values to console
        console.log(form.value);
        form.resetForm();
    }// End addSubject function

    ngOnInit() {
    }

}// End class
