import { Component, OnInit } from '@angular/core';
import { PostPageContent, RequestPageContent } from '../../../models/entities';
import { AdminApiService } from '../../../providers/admin-api.service';
import { ContentChange, SelectionChange } from 'ngx-quill';

@Component({
  selector: 'app-terms-agreement',
  templateUrl: './terms-agreement.component.html',
  styleUrls: ['./terms-agreement.component.scss']
})
export class TermsAgreementComponent implements OnInit {
  public loading: boolean = true;
  public entity: PostPageContent = new PostPageContent();
  public savedSuccess: number = 0;
  public isSaving: boolean = false;

  constructor(public api: AdminApiService) { }

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ],
    },
  }

  ngOnInit(): void {
    let page = new RequestPageContent();
    page.ContentKey = "TermsAgreement";
    this.api.GetPageContent(page).subscribe(data => {
      console.debug(data);
      this.loading = false;

      let item = new PostPageContent();
      item.ContentKey = "TermsAgreement";
      if (data.ContentData) {
        item.ContentData = data.ContentData;
      }
      this.entity = item;
    }, error => {
      this.loading = false;
      console.debug(error);
    });
  }

  public saveContent() {
    this.isSaving = true;
    this.entity.ContentKey = "TermsAgreement";
    console.debug(this.entity);
    this.api.SetPageContent(this.entity).subscribe(data => {
      console.debug(data);
      this.isSaving = false;
      if (data.Success) {
        this.savedSuccess = 1;
      }
      else {
        this.savedSuccess = 2;
      }
    }, error => {
      this.isSaving = false;
      console.debug(error);
    });
  }

  onSelectionChanged = (event: SelectionChange) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }
}
