import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { Student, School, Corrector, Student_Table} from './interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontendtest';

  studentTbl?: Student_Table[];
  schoolTbl:any[]=[];
  schoolLs?: School[];
  correctorLs:any[]=[];
  schCorrLs: any[] = [];


  displayedColumns: string[] = ['students', 'school_origin', 'school_correcting', 'cross_corrector'];
  dataSource = new MatTableDataSource<Student_Table>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  
  constructor
  (
    private apiSrvc : ApiService
  )
  {}

  ngOnInit()
  {
    this.getStudentTbl();
    this.getSchoolTbl();
    this.getSchoolList();
    this.getCorrectorList();
    this.getSchCorrLs();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
}

  getStudentTbl()
  {
    this.apiSrvc.getStudentTbl().subscribe(data =>
    {
      this.studentTbl = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }

  getSchoolTbl()
  {
    this.apiSrvc.getSchTbl().subscribe(data => 
    {
      this.schoolTbl = data;
      console.log(data);
    });
  }

  getSchoolList()
  {
    this.apiSrvc.getScList().subscribe(data=>
    {
      this.schoolLs = data;
      console.log(data);
    });

   
  }

  getCorrectorList()
  {
    this.apiSrvc.getCorList().subscribe(data=>
    {
      console.log(data);
      this.correctorLs = data;
    });
  }

  getSchCorrLs()
  {
    this.apiSrvc.getSchCorList().subscribe(data => 
    {
      this.schCorrLs = data;
      console.log(data);
    })
  }

}
