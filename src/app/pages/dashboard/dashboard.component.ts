import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { Addressdetail, propertyObj } from 'src/app/model/property';
import { PropertyServiceService } from 'src/app/service/property-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cities=[
    {"code": "AF", "code3": "AFG", "name": "Afghanistan", "number": "004"},
    {"code": "AL", "code3": "ALB", "name": "Albania", "number": "008"},
    {"code": "DZ", "code3": "DZA", "name": "Algeria", "number": "012"},
    {"code": "AS", "code3": "ASM", "name": "American Samoa", "number": "016"},
    {"code": "AD", "code3": "AND", "name": "Andorra", "number": "020"},
    {"code": "AO", "code3": "AGO", "name": "Angola", "number": "024"},
    {"code": "AI", "code3": "AIA", "name": "Anguilla", "number": "660"},
    {"code": "AQ", "code3": "ATA", "name": "Antarctica", "number": "010"},
    {"code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "number": "028"},
    {"code": "AR", "code3": "ARG", "name": "Argentina", "number": "032"},
    {"code": "AM", "code3": "ARM", "name": "Armenia", "number": "051"},
    {"code": "AW", "code3": "ABW", "name": "Aruba", "number": "533"},
    {"code": "AU", "code3": "AUS", "name": "Australia", "number": "036"},
    {"code": "AT", "code3": "AUT", "name": "Austria", "number": "040"},
    {"code": "AZ", "code3": "AZE", "name": "Azerbaijan", "number": "031"},
    {"code": "BS", "code3": "BHS", "name": "Bahamas (the)", "number": "044"},
    {"code": "BH", "code3": "BHR", "name": "Bahrain", "number": "048"},
    {"code": "BD", "code3": "BGD", "name": "Bangladesh", "number": "050"},
    {"code": "BB", "code3": "BRB", "name": "Barbados", "number": "052"},
    {"code": "BY", "code3": "BLR", "name": "Belarus", "number": "112"},
    {"code": "BE", "code3": "BEL", "name": "Belgium", "number": "056"},
    {"code": "BZ", "code3": "BLZ", "name": "Belize", "number": "084"},
    {"code": "BJ", "code3": "BEN", "name": "Benin", "number": "204"},
    {"code": "BM", "code3": "BMU", "name": "Bermuda", "number": "060"},
    {"code": "BT", "code3": "BTN", "name": "Bhutan", "number": "064"},
    {"code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "number": "068"},
    {"code": "BQ", "code3": "BES", "name": "Bonaire, Sint Eustatius and Saba", "number": "535"},
    {"code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "number": "070"},
    {"code": "BW", "code3": "BWA", "name": "Botswana", "number": "072"},
    {"code": "BV", "code3": "BVT", "name": "Bouvet Island", "number": "074"},
    {"code": "BR", "code3": "BRA", "name": "Brazil", "number": "076"},
  ]
  city=[{"id":1,"name":"Mumbai","stateId":1},{"id":2,"name":"Thane","stateId":1},{"id":3,"name":"Navimumbai","stateId":1},{"id":4,"name":"Pune","stateId":1},{"id":5,"name":"Nagpur","stateId":1},{"id":6,"name":"Aurangabad","stateId":1},{"id":7,"name":"Panjim","stateId":2},{"id":8,"name":"Surat","stateId":3},{"id":9,"name":"Ahmedabad","stateId":3},{"id":10,"name":"Hyderabad","stateId":4},{"id":11,"name":"Chennai","stateId":5},{"id":12,"name":"Coimbatore","stateId":5},{"id":13,"name":"Madurai","stateId":5},{"id":14,"name":"Salem","stateId":5},{"id":15,"name":"Kochi","stateId":6},{"id":16,"name":"Kozhikode","stateId":6},{"id":17,"name":"Thiruvananthapuram","stateId":6},{"id":18,"name":"Bangalore","stateId":7},{"id":19,"name":"Visakhapatnam","stateId":8},{"id":20,"name":"Lucknow","stateId":9},{"id":21,"name":"Kanpur","stateId":9},{"id":22,"name":"Meerut","stateId":9},{"id":23,"name":"Ghaziabad","stateId":9},{"id":24,"name":"Noida","stateId":9},{"id":25,"name":"Jaipur","stateId":10},{"id":26,"name":"Jodhpur","stateId":10},{"id":27,"name":"Faridabad","stateId":11},{"id":28,"name":"Gurgaon","stateId":11},{"id":29,"name":"Delhi","stateId":12},{"id":30,"name":"Kolkata","stateId":13},{"id":31,"name":"Patna","stateId":14},{"id":32,"name":"Raipur","stateId":15},{"id":33,"name":"Indore","stateId":16},{"id":34,"name":"Bhopal","stateId":16},{"id":35,"name":"Achalpur","stateId":1},{"id":36,"name":"Anjangaon","stateId":1},{"id":37,"name":"Amravati","stateId":1},{"id":49,"name":"Ahmednagar","stateId":1},{"id":38,"name":"Chandur Bazar","stateId":1},{"id":39,"name":"Chikhaldara","stateId":1},{"id":40,"name":"Daryapur","stateId":1},{"id":41,"name":"Morshi","stateId":1},{"id":42,"name":"Paratwada","stateId":1},{"id":43,"name":"Tiosa","stateId":1},{"id":44,"name":"Warud","stateId":1},{"id":45,"name":"Chandur Railway","stateId":1},{"id":46,"name":"Daman Gaon Railway","stateId":1},{"id":47,"name":"Badnera","stateId":1},{"id":48,"name":"Yavatmal","stateId":1}]
  bhkarr=[
    {"type":"RK","value":"rk"},
    {"type":"1BHK","value":"1bhk"},
    {"type":"2BHK","value":"2bhk"},
    {"type":"3BHK","value":"3bhk"},
    {"type":"4BHK","value":"4bhk"}
  ]
  propArr:propertyObj[];
  propObject:propertyObj;
  searchprop:boolean;
  buyForm:FormGroup;
  rentForm:FormGroup;
  comForm:FormGroup;
  proForm:FormGroup;
  sortOrder: number;
  sortField: string;
  sortOptions: any[];
  postProperty:boolean;
  submitted: boolean;
  constructor(public confirmationService:ConfirmationService,public messageService:MessageService,public storage:StorageService,public fb:FormBuilder,public proser:PropertyServiceService) {
    this.buyForm=fb.group({
      selectcities:fb.control('',Validators.required),
      propertytype:fb.control('',Validators.required),
      bhktype:fb.control('',Validators.required),
      propertystatus:fb.control('',Validators.required),

    });
     this.rentForm=fb.group({
      rselectcities:fb.control('',Validators.required),
      rpropertytype:fb.control('',Validators.required),
      rbhktype:fb.control('',Validators.required),
      rpropertystatus:fb.control('',Validators.required),

    });
    this.comForm=fb.group({
      cselectcities:fb.control('',Validators.required),
      cpropertytype:fb.control('',Validators.required),
      cbhktype:fb.control('',Validators.required),
      cpropertystatus:fb.control('',Validators.required),

    });
    this.proForm=fb.group({
      name:fb.control('',Validators.required),
      addres:fb.group({
          add:fb.control('',Validators.required),
          pincode:fb.control('',Validators.required),
          city:fb.control('',Validators.required),
          state:fb.control('',Validators.required),
      }),
      price:fb.control('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];  
    const d=this.storage.getUserData();
    console.log(d,'local data',this.cities);
    this.getProperty();
    this.propObject=new propertyObj();
    
  }
  openNew(){
   
    this.propObject = {};
    this.propObject.addres={};
    this.postProperty=true;
    this.submitted = false;
  }
deleteProp(product){
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + product.name + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.proser.removeProperty(product,product._id).subscribe(x=>{
        if(x){
          this.messageService.add({severity:'error', summary:'Deleted', detail:'Successfull deleted Property',life:2000});    
          this.getProperty()
        }
        })
      
    }
});
    
}
  saveproperty(){
    this.submitted = true;
    console.log('CHECK OBJ',this.propObject)
    if(this.propObject._id){
this.proser.updateProperty(this.propObject,this.propObject._id).subscribe(x=>{
    console.log(x)
    if(x){
      this.messageService.add({severity:'warn', summary:'Update', detail:'Successfull Update Property',life:2000});    
      this.getProperty()
    }
})
    }
    else{
      this.proser.addProperty(this.propObject).subscribe((x:any)=>{
        if(x){
          this.messageService.add({severity:'success', summary:'Save', detail:'Successfull Property Save',life:2000});    
          this.getProperty()
        }
      })
    }
    this.postProperty=false;
  }
  editProperty(product){
    this.propObject = {...product};
    this.postProperty=true
  }
  searchNow(){
    this.searchprop=true
  }
  addProperty(){
 
  }
  getProperty(){
    this.proser.getProperty().subscribe((x:any)=>{
      this.propArr=x
      console.log(this.propArr,'data from server');
      
    })
  }
  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}

