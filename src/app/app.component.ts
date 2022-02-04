import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { Student, School, Corrector, Student_Table} from './interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontendtest';


  stdControl = new FormControl();
  schControl = new FormControl();
  corrControl = new FormControl();
  ccControl = new FormControl();
  scControl = new FormControl();

  stdOpt?: Student_Table[];
  schOpt: any[] = [];
  stdFilOpt?: Observable<any>;
  schFilOpt?: Observable<any>;
  corrFilOpt?: Observable<any>;

  studentTbl: Student_Table[] = [];
  schoolTbl?:School[];
  totalSchool:number = 0;
  schoolLs: any[] = [];
  correctorLs:any[]=[];
  schCorrLs: any[] = [];

  displayedColumns: string[] = ['students', 'school_origin', 'school_correcting', 'cross_corrector'];
  displayedColumns2: string[] = ['schools', 'students', 'correction', 'diff'];

  stdDataSource = new MatTableDataSource<Student_Table>();

  dataSource2 = new MatTableDataSource<School>();

  dataSubs?: Subscription;


  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  
  constructor
  (
    private apiSrvc : ApiService
  )
  {}


  insertDataCC(e:any, i:any)
  {
    this.studentTbl[i].school_correcting_corrector_id = e;
  }

  insertDataSC(e:any, i:any)
  {
    this.studentTbl[i].school_correcting_id = e;
  }

  getSchoolE(e:any)
  {
    return this.schOpt.filter(sc => sc.school._id !== e);
  }

  ngOnInit()
  {
    this.getStudentTbl();
    this.getSchoolTbl();
    this.getSchoolList();
    this.getCorrectorList();
    this.getSchCorrLs();


    this.stdFilOpt = this.stdControl.valueChanges.pipe(
      startWith(''),
      map(value => this.stdFilter(value))
    );

    this.schFilOpt = this.schControl.valueChanges.pipe(
      startWith(''),
      map(value => this.schFilter(value)),
    );

    this.corrFilOpt = this.corrControl.valueChanges.pipe(
      startWith(''),
      map(value => this.corrFilter(value)),
    );

  }

  ngAfterViewInit(): void {
    // if(this.stdDataSource.data) this.stdDataSource.paginator = this.paginator;    
  }

  private stdFilter(value:string) 
  {
    if(!value)
    {
      this.reset();
      return this.studentTbl;
    }else{
      const filterValue = value.toLowerCase();
      return this.studentTbl.filter(std => std.student_id.first_name.toLocaleLowerCase().includes(filterValue) || std.student_id.last_name.toLocaleLowerCase().includes(filterValue) );  
    }
  }

  private schFilter(value:string) 
  {
    if(!value)
    {
      this.reset();
      return this.schoolLs;
    }else{
      return this.schoolLs.filter(sch => sch.school.short_name.toLocaleLowerCase().includes(value.toLowerCase()));  
    }
  }

  private corrFilter(value:string) 
  {
    if(!value)
    {
      this.reset();
      return this.correctorLs;
    }else{
      return this.correctorLs.filter(corr => corr.school_correcting_corrector_id.first_name.toLocaleLowerCase().includes(value.toLowerCase()));  
    }
  }

  filterStdDatasource(stdId:string)
  {
    this.stdDataSource = new MatTableDataSource<Student_Table>(this.studentTbl);
    this.stdDataSource.data = this.stdDataSource.data.filter(std => std.student_id._id.toLocaleLowerCase().includes(stdId));
  }

  filterSchDatasource($event:any, schId:string)
  {    
    if($event.isUserInput)
    {
      this.stdDataSource = new MatTableDataSource<any>(this.studentTbl);
      this.stdDataSource.data = this.stdDataSource.data.filter(sch => sch?.school_origin_id?._id.toLocaleLowerCase().includes(schId));  
    }
  }

  filterCorrDatasource($event:any, corrId:string)
  {    
    if($event.isUserInput)
    {
      this.stdDataSource = new MatTableDataSource<any>(this.studentTbl);
      this.stdDataSource.data = this.stdDataSource.data.filter(sch => sch?.school_origin_id?._id.toLocaleLowerCase().includes(corrId));  
    }
  }

  getStudentTbl()
  {
    this.dataSubs = this.apiSrvc.getStudentTbl().subscribe(data =>
    {
      this.stdDataSource = new MatTableDataSource<Student_Table>(data);
      this.stdDataSource.paginator = this.paginator;
      this.studentTbl = data;
      this.stdOpt = data;
    });
  }

  getDataWithNoCor()
  {
    return this.studentTbl.filter(dt => dt.school_correcting_corrector_id._id == null && dt.school_correcting_id._id == null).length
  }

  getScCor(e:any)
  {
    return this.schCorrLs.filter(scc => scc.school._id == e.school_correcting_id._id)[0].cross_correctors;
  }

  getSchoolTbl()
  {
    this.apiSrvc.getSchTbl().subscribe(data => 
    {
      this.schoolTbl = data;
      this.dataSource2.data = data;
      this.totalSchool = data.length;
      console.log(data)

    });
  }

  getSchoolList()
  {
    this.apiSrvc.getScList().subscribe(data=>
    {
      this.schoolLs = data;
      this.schOpt = data;
    });
  }

  getCorrectorList()
  {
    this.apiSrvc.getCorList().subscribe(data=>
    {
      this.correctorLs = data;
    });
  }

  getSchCorrLs()
  {
    this.apiSrvc.getSchCorList().subscribe(data => 
    {
      this.schCorrLs = data;

    })
  }

  reset()
  {
    this.schControl.reset('',{emitEvent:false});
    this.stdControl.reset('',{emitEvent:false});
    this.corrControl.reset('',{emitEvent:false});
    this.scControl.reset('',{emitEvent:false});
    this.ccControl.reset('',{emitEvent:false});
    this.stdDataSource.data = this.studentTbl;
    this.stdDataSource.paginator = this.paginator;
  }

}
