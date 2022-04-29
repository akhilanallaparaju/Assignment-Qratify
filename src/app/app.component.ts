import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';


 interface Node {
  name: string;
  children?: Node[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-Qratify';
  message = "Nothing Selected"
  selectedName = ""

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  constructor(private http: HttpClient) {
    this.getTreeStructure().subscribe(res =>  this.dataSource.data = res);
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  updateSelectedName(name: string){
    this.message = name + " Selected"
    this.selectedName = name
  }
  getTreeStructure(){
    const url = 'https://61f5037b62f1e300173c3f8d.mockapi.io/node'
    return this.http.get<Node[]>(url)
  }
}
