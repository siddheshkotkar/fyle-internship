import { Component, ViewChild } from '@angular/core';
import { SubjectsService } from '../../subjects.service'
import { TempService } from 'src/app/temp.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  allData : any = []
  data : any = []
  subject: string = "javascript";
  currentPage: any = 1;
  totalPages: any = 1;
  @ViewChild('query') query : any;
  private subscriptionName: Subscription;
  constructor(private user:SubjectsService, private tempService:TempService, private spinner: NgxSpinnerService)
  {
    this.subscriptionName = this.tempService.getSubject().subscribe(
      subject => {
        this.spinner.show();
        this.subject = subject
        this.user.getData(subject).subscribe(data => {
          this.allData = data['docs' as keyof typeof data]
          console.log(data)
          this.currentPage = 1;
          this.totalPages = data['numFound' as keyof typeof data]
          this.data = this.allData.slice(this.currentPage-1, Math.min(this.currentPage+10, this.totalPages))
          console.log(this.totalPages)
          this.spinner.hide()
        })
      }
    )
  }

  nextPage() {
    this.currentPage+=10;
    this.data = this.allData.slice(this.currentPage-1, Math.min(this.currentPage+10, this.totalPages))
    // this.user.getData(this.subject).subscribe(data => {
    //   this.data = data
    //   console.log(data)
    // })
  }

  previousPage() {
    this.currentPage-=10;
    this.data = this.allData.slice(this.currentPage-1, Math.min(this.currentPage+10, this.totalPages))
    // this.user.getData(this.subject).subscribe(data => {
    //   this.data = data
    // })
  }

  search() {
    console.log(this.query.nativeElement.value)
    this.data = []
    this.spinner.show();
    this.user.search(this.query.nativeElement.value).subscribe(data => {
      this.allData = data['docs' as keyof typeof data]
      console.log(data)
      this.currentPage = 1;
      this.totalPages = data['numFound' as keyof typeof data]
      this.data = this.allData.slice(this.currentPage-1, Math.min(this.currentPage+10, this.totalPages))
      console.log(this.totalPages)
      this.spinner.hide()
    })
  }


}
