import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { PromoService } from '../promo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-promo-form',
  templateUrl: './add-promo-form.component.html',
  styleUrls: ['./add-promo-form.component.scss']
})
export class AddPromoFormComponent implements OnInit {
  private subs = new SubSink();
  promoForm: FormGroup;
  editMode: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private promoService: PromoService,
    private dialog: MatDialogRef<AddPromoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.editMode = true;
      this.setFormValues(this.data.promo)
    }
  }

  initForm() {
    this.promoForm = this.fb.group({
      title: ['', Validators.required],
      sub_title: ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  setFormValues(promoData: any) {
    this.promoForm.patchValue({
      title: promoData.title,
      sub_title: promoData.sub_title,
      description: promoData.description,
      image_url: promoData.image_url,
      status: promoData.status
    })
  }

  onSubmit() {
    if (!this.editMode) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this promo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.createPromo();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Promo creation canceled', 'info');
        }
      });
    } else if (this.editMode) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this promo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.updatePromo();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Promo update canceled', 'info');
        }
      });
    }
  }

  createPromo() {
    if (this.promoForm.valid) {
      const promoInput = this.promoForm.value;
      this.promoService.createPromo(promoInput).subscribe(result => {
        console.log('Promo created successfully:', result);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Promo created successfully',
          confirmButtonText: 'OK'
        });
        this.closeDialog();
      }, error => {
        console.error('Error creating promo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to create promo',
          confirmButtonText: 'OK'
        });
      });
    }
  }

  updatePromo() {
    if (this.promoForm.valid) {
      const promoId = this.data.promo._id;
      const promoInput = this.promoForm.value;
      this.promoService.updatePromo(promoId, promoInput).subscribe(result => {
        console.log('Promo updated successfully:', result);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Promo updated successfully',
          confirmButtonText: 'OK'
        });
        this.closeDialog();
      }, error => {
        console.error('Error updating promo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update promo',
          confirmButtonText: 'OK'
        });
      });
    }
  }
  

  closeDialog() {
    this.dialog.close();
  }
}
