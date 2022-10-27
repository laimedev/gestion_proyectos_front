import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, BehaviorSubject, Subscription } from 'rxjs';


import { Permissions } from '../../../entities/security/permissions';
import { PermissionService } from '../../../services/security/permission.service';
import { PermissionTree } from '../../../utils/helpers/permission-tree'
import { Rol } from '../../../entities/security/rol'


/**************************************************************\
 * TODO: need to refactor                                     *
 * bit of code here was taken from Angular MatTree            *
 * @see https://material.angular.io/components/tree/examples  *
 *                                                            *
\**************************************************************/

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  providers: [
    PermissionService
  ]
})
export class RoleFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() closeEvent = new EventEmitter<boolean>()
  @Output() submitEvent = new EventEmitter<Rol>()
  @Input() flatData: Permissions[]
  @Input() disableControl: boolean
  @Input() serverResponseJSON: any
  @Input() formTitle: string

  @ViewChild('tree') tree: MatTree<Permissions>

  treeControl = new NestedTreeControl<Permissions>(node => of(node.children))
  dataSource: MatTreeNestedDataSource<Permissions>
  selection: SelectionModel<number>

  hasChild = (_: number, node: Permissions) => !!node.children && node.children.length > 0;

  hasNoPermission: boolean;

  permSubcription: Subscription;

  refreshTable = false

  constructor(
    protected fb: FormBuilder,
    protected permissionService: PermissionService) {
  }


  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    console.log('cancela');
    if (this.permSubcription)
      this.permSubcription.unsubscribe()
  }

  isSelected(node: Permissions) {
    return this.selection.isSelected(node.id)
  }

  leafItemSelectionToggle(node: Permissions): void {

    this.selection.toggle(node.id);
    this.checkAllParentsSelection(node);

  }

  descendantsAllSelected(node: Permissions): boolean {

    const descendants = this.treeControl.getDescendants(node);

    const descAllSelected = descendants.every(child =>
      this.selection.isSelected(child.id)
    );

    return descAllSelected;

  }

  changeItemSelectionToggle(node: Permissions): void {
    this.selection.toggle(node.id);
    const descendants = this.treeControl.getDescendants(node);
    let ifv = this.selection.isSelected(node.id)


    ifv
      ? this.selection.select(...descendants.map(i => i.id))
      : this.selection.deselect(...descendants.map(i => i.id));

    // Force update for the parent
    descendants.every(child =>
      this.selection.isSelected(child.id)
    );
    this.checkAllParentsSelection(node);
  }

  descendantsIndeterminateSelected(node: Permissions): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.selection.isSelected(child.id));
    return result && !this.descendantsAllSelected(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: Permissions): void {
    let parent: Permissions | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }

  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: Permissions): void {

    const nodeSelected = this.selection.isSelected(node.id);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.selection.isSelected(child.id)
    );

    if (nodeSelected && !descAllSelected) {
      this.selection.deselect(node.id);
    } else if (!nodeSelected && descAllSelected) {
      this.selection.select(node.id);
    }

  }

  getParentNode(node: Permissions) {

    let parent = null

    this.dataSource.data.forEach(n => {

      if (n.id == parseInt(node.parent!)) {
        parent = n;
        //console.log('this is the parent: ' + n.text);

      }
    })

    return parent;
  }

  ngOnInit(): void {

    let selectedPermissionsId: number[] = this.formGroup.get('permissions').value

    this.dataSource = new MatTreeNestedDataSource<Permissions>();
    this.selection = new SelectionModel<number>(true /* multiple */, selectedPermissionsId)

    this.permSubcription = this.permissionService.getPermissions().subscribe(e => {
      this.flatData = e
      let tree: Permissions[] = PermissionTree.toTree(e)
      this.dataSource.data = tree
      this.treeControl.dataNodes = tree


      /**
       * TODO: Refactoring ASAP!
       */
      this.flatData.filter(i => selectedPermissionsId.includes(i.id)).forEach((sel) => {

        let parents_ = PermissionTree.getParent(sel, this.flatData)

        this.flatData?.filter((i) => parents_.includes(i.id))
          .forEach(e => this.treeControl.expand(e))

      })



    })

    console.log(this.formGroup.get('permissions').value);

  }

  closeMOdal(): void {
    this.closeEvent.emit(this.refreshTable)
  }

  submit() {
this.refreshTable= true
    let selected = PermissionTree.getSelected(this.selection, this.flatData)

    if (selected.length <= 0) {
      this.hasNoPermission = true
      return
    } else {
      this.hasNoPermission = false
    }

    this.formGroup.get('permissions').setValue(selected)

    if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value)
    }
  }

  /**
   * TrackBy
   */
  fn(index: number, node: Permissions) {
    return node.id
  }


}
