import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-sent-page',
  templateUrl: './email-sent-page.component.html',
  styleUrls: ['./email-sent-page.component.scss']
})
export class EmailSentPageComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  continueClick() {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/' } });
  }
}
