import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/entities/security/rol';
import { RolService } from 'src/app/services/security/rol.service';
import { PermissionTree } from 'src/app/utils/helpers/permission-tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { Permissions } from 'src/app/entities/security/permissions';

@Component({
  selector: 'app-view-rol',
  templateUrl: './view-rol.component.html',
  styleUrls: ['./view-rol.component.scss']
})
export class ViewRolComponent implements OnInit {

  @Input() rol: Rol

  rolName: string

  treeControl = new NestedTreeControl<Permissions>(node => of(node.children))
  dataSource: MatTreeNestedDataSource<Permissions>
  hasChild = (_: number, node: Permissions) => !!node.children && node.children.length > 0;

  constructor(protected activeModal: NgbActiveModal, protected rolService: RolService) { }

  ngOnInit(): void {
    this.dataSource = new MatTreeNestedDataSource<Permissions>();
    this.rolService.getById(this.rol).subscribe((data) => {
      console.log(data);
      this.rolName = data.displayName
      let tree = PermissionTree.toTree(data.permissions);
      this.dataSource.data = tree
      this.treeControl.dataNodes = tree
      this.treeControl.expandAll()
      
    })

  }

  closeMOdal(): void {
    this.activeModal.close("CTM")
  }
  /**
   * TrackBy
   */
  fn(index: number, node: Permissions) {
    return node.id
  }

}
