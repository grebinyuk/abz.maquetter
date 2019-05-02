<template>
    <div class="signUp-form">
    <form  id="signUp-frm" novalidate="novalidate" v-on:submit.prevent="registrationNewUser">



        <fieldset class="f-name" :class="{error:errors.name}">
            <legend>Name</legend>
            <input  type="text" name="name" v-model="name" placeholder="Your name">
            <p v-if="errors.name">{{errors.name[0]}}</p>
        </fieldset>


        <fieldset class="f-emeil" :class="{error:errors.email}">
            <legend>Email</legend>
            <input type="email" name="email" v-model="email" placeholder="Your email">
            <p v-if="errors.email">{{errors.email[0]}}</p>
        </fieldset>


        <fieldset class="f-phone" :class="{error:errors.phone}">
            <legend>Phone</legend>
            <input type="tel" name="phone" v-model="phone" placeholder="+3 (__) ___ __ __">
            <p v-if="errors.phone">{{errors.phone[0]}}</p>
        </fieldset>


        <fieldset class="f-position" :class="{error:errors.position_id}">
            <select id="position" class="" name="position" v-model="position_id">
                <option value="">Select your position</option>
                <option v-for="option in options" v-bind:value="option.id" v-bind:key="option.id">{{option.name}}</option>
                <p v-if="errors.posititon_id">{{errors.posititon_id[0]}}</p>
            </select>

          <label for="position"></label>
        </fieldset>


        <fieldset class="f-photo" :class="{error:errors.photo}">
            <input type="file" id="photo" name="photo">
            <label for="photo">Upload</label>
            <span>Upload your photo</span>
            <span>File format jpg up to 5 MB, the minimum size of 70x70px</span>
            <p v-if="errors.photo">{{errors.photo}}</p>
        </fieldset>

        <button type="submit" id="btn-submit" class="button btn-primary disabled" name="button">Sign Up</button>
    </form>

    <div class="popap-success-registr" v-if="success_active">
      <h3>Congratulation</h3>
      <p>You have successfully passed the registration</p>
      <buttom class="ok-button" @click="success_active=false">OK</buttom>
    </div>
    <div class="popap-layout" v-if="success_active"></div>
</div>
</template>





<script>
export default{

  data: () => (
    {
    myFirst: 'My first Vue.js component',
    novalidate: "true",
    name: null,
    email: null,
    phone: null,
    position_id: null,
    options: [],
    file: null,

    token: '',
    success_active: false,
    errors: {name:'', email:'', phone:'', position_id:'', photo:''}
  }
),
methods: {



  registrationNewUser() {
    // validator();
    var self = this;

    var formData = new FormData();

    // file from input type='file'
    var fileField = document.querySelector('input[type="file"]');
    formData.append('position_id', this.position_id);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('photo', fileField.files[0]);
    console.log(formData);


    self.token=getToken('https://frontend-test-assignment-api.abz.agency/api/v1/token');


    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: {
        'Token': self.token  // get token with GET api/v1/token method
      }
    })
    .then(function(response) {
      return response.json();
      console.log(response);
    })
    .then(function(data) {
      console.log(data);
      if(data.success) {
        console.log(data.message)
        // process success response
        self.success_active = true;
      } else {
        if(data.fails){
          self.errors = Object.assign(self.errors, data.fails);
          console.log(self.errors);
        }
        // proccess server errors
      }
    })
    .catch(function(error) {

      console.log(error.name + ':' + error.message);
      // proccess network errors
    });
  }
},
beforeCreate() {
  var self = this;

  fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
 .then(function(response) {
   if(!response.ok){
     if(response.status == 422){
       response.json().then(function(object){
         console.log(object.message);
       })
     }
     throw new Error('Something went wrong...');
   }
   return response.json();
 })
 .then(function(data) {
   console.log(data);
   self.options = data.positions;
 })
 .catch(function(error){
     console.log(error.message);
 })
}
}


function  getToken(urlToken){
  fetch(urlToken)
  .then(function(response) {
     return response.json();
  })
     .then(function(data) {
       self.token = data.token;

        return self.token;
  })
  .catch(function(error) {
   console.log(error.name +':'+ error.message);
     // proccess network errors
  });
return self.token;

}


</script>










<style lang="sass" scoped>

@import "../sass/_fonts"
@import "../sass/_libs"
@import "../sass/_vars"

.signUp-form
  width: 100%

#signUp-frm
	display: grid
	grid-template-columns: repeat(12, minmax(20px, 80px))
	grid-template-rows: repeat(2, 63px)
	grid-gap: 30px
	padding-top: 56px
	padding-bottom: 20px
	margin: auto
	font-family: 'SourceSansPro'
	color: #8d8c8c


fieldset
	position: relative
	display: inline-block
	height: 63px
	border: 1px solid #b7b7b7
	border-radius: 3px
	margin-bottom: 40px
	padding: 2px 5px
	legend
		font-size: 12px
		margin-left: 5px
		text-align: left
	input
		height: 40px
		width: 95%
		border: none
		font-family: 'SourceSansPro'
		font-size: 16px
		color: #8d8c8c
		&:focus
			outline: none



input[placeholder]
	text-overflow: ellipsis

input::-moz-placeholder
	text-overflow: ellipsis

input:-moz-placeholder
	text-overflow: ellipsis

input:-ms-input-placeholder
  text-overflow: ellipsis

input[-moz-placeholder]
	text-overflow: ellipsis



.f-emeil, .f-phone, .f-name
	grid-column-end: span 4

.f-photo, .f-position
	margin-top: 3px
	grid-column-end: span 6


#btn-submit
	grid-column-start: 4
	grid-column-end: span 5
	margin-top: 35px
	padding: 8px 50px


.f-position
	select
		height: 55px
		width: 100%
		border: none
		option
			color: red
			padding: 5px 0
			height: 40px
			width: 300px
	label
		display: inline-block
		position: absolute
		border: 2px solid $primaryColor
		height: 63px
		width: 150px
		right: -1px
		top: -1px


.f-photo
	label
		display: inline-block
		position: absolute
		border: 2px solid $primaryColor
		height: 63px
		width: 150px
		right: -1px
		top: -1px
		border-bottom-right-radius: 3px
		border-top-right-radius: 3px
		font-family: 'SourceSansPro'
		font-weight: bold
		font-size: 22px
		letter-spacing: 1px
		color: $primaryColor
		line-height: 63px
		cursor: pointer
	span
		position: absolute
		&:first-of-type
			top: 0
			left: 15px
			opacity: 0.7
			line-height: 63px
		&:last-of-type
			bottom: -20px
			left: 20px
			font-size: 12px
	input
		opacity: 0

.popap-success-registr
  width: 300px
  height: 200px
  position: fixed
  top: 50%
  left: 50%
  padding: 20px
  border-radius: 5px
  text-align: left
  transform: translateX(-50%) translateY(-50%)
  z-index: 5
  background-color: #fff
  transition: All .5s
  h3
    margin: 0
  p
    color: #8d8c8c

.popap-layout
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 2
  background-color: grey
  opacity: 0.6


.ok-button
  position: absolute
  right: 20px
  bottom: 20px
  text-decoration: none
  font-family: 'SourceSansPro', sans-serif
  font-size: 22px
  font-weight: 600
  color: $primaryColor
  cursor: pointer
  &:hover
    color: #fc831f
  &:active
    color: #fc831f
    transform: scale(1.1)

input+p
  color: red
  font-size: 12px
  text-align: left
  font-weight: 600
  margin-top: 6px


.error
  border-color: red
  legend
    color: red

  /* Large Devices, Wide Screens */
@media only screen and (max-width : 1200px)
  /**/
    /* Medium Devices, Desktops */
@media only screen and (max-width : 1024px)
  /**/
  /* Medium Devices, Desktops */
@media only screen and (max-width : 992px)
  /**/
  /* Small Devices, Tablets */
@media only screen and (max-width : 768px)
  /**/
  /* Extra Small Devices, Phones */
@media only screen and (max-width : 480px)
  /**/
  #signUp-frm
    grid-template-columns: repeat(4, 21%)
    grid-template-rows: repeat(6, 63px)
    grid-gap: 15px
    grid-row-gap: 30px

  #btn-submit
    grid-column-start: 1
    grid-column-end: span 4
    margin-top: 10px
    padding: 8px 50px

  .f-emeil, .f-phone, .f-name, .f-photo, .f-position
    grid-column-end: span 4


    /* Custom, iPhone Retina */
@media only screen and (max-width : 320px)
  /**/
  .f-photo
    span:first-of-type
      font-size: 14px
    span:last-of-type
      font-size: 11px

</style>
