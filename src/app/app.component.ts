import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { FreelancerAddEditComponent } from './freelancer-add-edit/freelancer-add-edit.component';
import { HttpService } from './services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showIdColumn = false
  displayedColumns: string[] = [
    'username', 
    'email', 
    'phoneNumber', 
    'location', 
    'linkedInUrl', 
    'skillsets', 
    'hobbies',
    'action'
  ]
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _httpService: HttpService,
    private _coreService: CoreService
  ){ }

  ngOnInit(): void {
    this.getFreelancers()
  }

  openFreelancerAddEditForm(){
    const dialogRef = this._dialog.open(FreelancerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._coreService.openSnackBar('Freelancer added successfully!', 'done')
          this.getFreelancers();
        }
      }
    })
  }

  getFreelancers(){
    this._httpService.getFreelancers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFreelancer(id: string){
    this._httpService.deleteFreelancer(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Freelancer deleted succesfully!', 'done')
        this.getFreelancers();
      },
      error: console.log
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FreelancerAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._coreService.openSnackBar('Freelancer updated succesfully!', 'done')
          this.getFreelancers();
        }
      }
    })
  }

}
