let base_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?'


// async function get_json(){
//     let response=await fetch(`${base_URL}s=${meal_name}`)
//     let response_json=await response.json();
//     console.log(response_json)
// }
// get_json()


//
// side bar function
let w = $('.content_div').outerWidth();
$('aside').animate({ left: `-${w}px` }, 50)
$('#open_close_icon').click(function () {

    if ($('#open_close_icon').html() == '<i class="fa-solid fa-xmark"></i>') {
        $('aside').animate({ left: `-${w}px` });
        $('#open_close_icon').html('<i class="fa-solid fa-bars"></i>')
    }
    else if ($('#open_close_icon').html() == '<i class="fa-solid fa-bars"></i>') {
        $('aside').animate({ left: `0px` });
        $('#open_close_icon').html('<i class="fa-solid fa-xmark"></i>')
    }


})

// welcome_page data fetching
async function get_json_of_welcome_page() {
    $('main').html(`<div class="d-flex justify-content-center align-items-center">
            <div class="loader"></div>
        </div>`)


    let response = await fetch(`${base_URL}s=`);
    let response_json = await response.json();
    dataArr = response_json.meals
    if (dataArr != null) {
        let box = ``;
        for (let i = 0; i < dataArr.length; i++) {
            box += `
        <div class="col-3 p-4">
        
        
         <div class="mother_div_hover  position-relative"   >
                        <img src=${dataArr[i].strMealThumb} class="w-100 border border-0 rounded-2" alt=""  >
                        <div class="hover_div  d-flex justify-content-center align-items-center   w-100 h-100 position-absolute  border border-0 rounded-2 "    >
                            <p class="meal_name text-danger me-auto opacity-100 text-black fs-3 ms-1"   id="meal_num_${i}" >${dataArr[i].strMeal}</p>
                        </div>
                    </div>
                
        
        
        </div>
                   
        `
        }
        let main_box = `
        <div class="container-fliud text-white ">
                <div class="row" id="row_content">
               ${box}
                </div>
             </div>
        `

        $('main').html(`${main_box}`)

        console.log(response_json)
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }

    $('.mother_div_hover').click(function (e) {

        get_meal_details(e.target.outerText)
    })


}
get_json_of_welcome_page()

//search_by_word
$('.links_div').children(".class-x").click(function () {
    display_search()
})
let row_content = `
<div class="col-6 p-2">
                    <div class="border-div w-100"><input   class="w-100 form-control " type="text" id="search_input_word" placeholder="search by a word"></div>
                </div>
                <div class="col-6 p-2">
                    <div class="border-div w-100"><input pattern="[A-Za-z]{1}" class="w-100  form-control" type="text" id="search_input_letter" placeholder="search by the first letter"></div>
                </div>`
let search_box = `
     <div class="container-fliud text-white ">
            <div class="row" id="row_content">
                ${row_content} 
            </div>
        </div>
    `
function display_search() {
    $('aside').animate({ left: `-${w}px` }, 500)

    $('main').html(`${search_box}`)
    $('#search_input_word').keyup(function (e) {
        console.log(e.target.value)
        word_search(e.target.value)
    })





    $('#search_input_letter').keyup(function () {
        let ele = $('#search_input_letter');

        if (ele.val().length > 0) {
            let letter = ele.val()[0]
            if (letter_search_validation(letter)) {
                get_letter_data(letter)
                console.log("yes")
                ele.val(ele.val()[0])
            }
        }



        // letter_search_validation(e.key)
    })
}
async function word_search(word) {

    $('.col-3').remove()
    let response = await fetch(`${base_URL}s=${word}`)
    let response_json = await response.json();
    dataArr = response_json.meals
    if (dataArr == null) {
        $('main').append(``)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    else { display_any(dataArr) }
    console.log(dataArr)

}
function display_any(dataArr) {
    let box = ``
    if (dataArr != null) {
        for (let i = 0; i < dataArr.length; i++) {
            box += `
    <div class="col-3 p-2">
            <div class="mother_div_hover position-relative" >
                <img src='${dataArr[i].strMealThumb}' class="w-100 border border-0 rounded-2" alt="">
                <div class="hover_div  d-flex justify-content-center align-items-center  w-100 h-100 position-absolute  border border-0 rounded-2 "
                    >
                    <p class="meal_name text-danger me-auto opacity-100 text-black fs-3 ms-1" id="meal_num_${i}">
                        ${dataArr[i].strMeal}
                    </p>
                </div>
            </div>
        </div>
    
    `

        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    $('.col-3').remove()

    $('.row').append(box)
    $('.mother_div_hover').click(function (e) {

        get_meal_details(e.target.outerText)
    })
}

//search_by_letter
async function get_letter_data(letter) {

    let response = await fetch(`${base_URL}f=${letter}`)
    let response_json = await response.json();
    let data_arr = response_json.meals
    display_any(data_arr)

}
function letter_search_validation(letter) {
    let validator = /^[a-zA-Z]$/g
    if (validator.test(letter)) {
        return true
    }
    else return false



}


//single meal display
async function get_meal_details(name) {
    let meal_name = name;
    let single_response = await fetch(`${base_URL}s=${meal_name}`);
    let response_json = await single_response.json();
    let meal_element = response_json.meals[0]
    console.log(meal_element)

    single_meal_display(meal_element)

}
function single_meal_display(meal_element) {





    //getting array of ingredient
    let values_Arr = [];
    for (let x = 1; x <= 20; x++) {
        let key = `strIngredient${x}`
        if (meal_element[key] == '') {

            break;
        }
        else values_Arr.push(meal_element[key])

    }

    //getting array of ingredient
    let values_Arr_m = [];
    for (let x = 1; x <= 20; x++) {
        let key = `strMeasure${x}`
        if (meal_element[key] == ' ') {

            break;
        }
        else values_Arr_m.push(meal_element[key])

    }


    //writing tags into html 
    let sub_box_one = ``
    for (let i = 0; i < values_Arr.length; i++) {
        sub_box_one += `
    <p  class="mx-2 bg-info float-start  border border-0 rounded-2 "><span>${values_Arr_m[i]}</span>  <span>${values_Arr[i]}</span></p>
    `
    }

    //tags writing
    let sub_box_two = ``
    let tags = meal_element.strTags;
    let tags_arr = []
    if (tags == null) {
        sub_box_two = ``
    }
    else if (tags.includes(',')) {
        tags_arr = tags.split(',')
    }
    else tags_arr = [tags]




    for (let i = 0; i < tags_arr.length; i++) {
        sub_box_two += `
    <p class="tag-color border  mx-2 border-0 rounded-2  float-start ">${tags_arr[i]}</p>
    `
    }

    // writing into row div

    let box = `
     <div class="col-4 p-2">
                    <div>
                        <img src="${meal_element.strMealThumb}" class="w-100 border border-1 rounded-2" alt="">
                        <h1>${meal_element.strMeal}</h1>
                    </div>

                 </div>
                   <div class="col-8 p-2">
                     <div>
                        <h1>Instructions </h1>
                        <p>${meal_element.strInstructions}</p>
                        <h1>Area : <span>${meal_element.strArea}</span> </h1>
                        <h1>Category : <span>${meal_element.strCategory}</span></h1>
                        <h1>Recipes :</h1>
                        <div>
                           <div>
                           ${sub_box_one}
                            <div class="clearfix"></div>
                           </div>
                        </div>

                         <h1 class="my-2">Tags :</h1>
                         ${sub_box_two}
                         <div class="clearfix"></div>
                         <div> 
                            <a href="${meal_element.strSource}" class="text-decoration-none text-white bg-green border border-0 rounded-2 p-1">source</a>
                            <a href="${meal_element.strYoutube}" class="text-decoration-none text-white bg-danger border border-0 rounded-2 p-1">Youtube</a>
                         </div>
                     </div>
                   </div>         
    `
    $('#row_content').html(`${box}`)
}





//categories_display
$('.links_div').children(".class-y").click(function () {
    $('aside').animate({ left: `-${w}px` }, 500)
    $('#open_close_icon').html('<i class="fa-solid fa-bars"></i>')
    get_category_data()
})
async function get_category_data() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response_json = await response.json()

    let data_arr = response_json.categories
    console.log(data_arr)
    display_cat(data_arr)
}
let cat_name_arr = []
function display_cat(data_arr) {
    let box = ``

    for (let i = 0; i < data_arr.length; i++) {
        cat_name_arr.push(`${data_arr[i].strCategory}`)
        box += `
        <div class="col-3 p-2">
                    <div class="mother_div_hover position-relative"  >
                        <img src='${data_arr[i].strCategoryThumb}' class="w-100 border border-0 rounded-2" alt="">
                        <div id='${i}'
                            class="hover_div    w-100 h-100 position-absolute  border border-0 rounded-2 pb-2 ">
                            <h1 class="cat_name text-black m-0 w-100">${data_arr[i].strCategory}</h1>
                            <p class="meal_name text-danger m-auto opacity-100 text-black fs-6 ms-1 w-100" id="meal_num_0 ">${(data_arr[i].strCategoryDescription).substring(0, 100)}</p>
                        </div>
                    </div>
                </div>
        `
    }

    $('.col-3').remove()
    $('.row').html(box)
    $('.hover_div').click(function (e) {

        console.log(e.target.parentNode.id)
        get_cat_meals_data(e.target.parentNode.id)
    })
}
async function get_cat_meals_data(id) {
    let cat = cat_name_arr[id];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    let response_json = await response.json();
    dataArr = response_json.meals

    display_any(dataArr)
}


//area - display
$('.links_div').children(".class-z").click(function () {
    $('aside').animate({ left: `-${w}px` }, 500)
    $('#open_close_icon').html('<i class="fa-solid fa-bars"></i>')
    get_area_data()
})
async function get_area_data() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response_json = await response.json();
    let dataArr = response_json.meals
    console.log(dataArr)
    display_ares(dataArr)
}

let Area_name_arr = []
function display_ares(dataArr) {
    let box = ``;
    for (let i = 0; i < dataArr.length; i++) {
        Area_name_arr.push(`${dataArr[i].strArea}`)
        box += `
          <div class="col-3 p-4 text-white">
                        <div class="mother_div_hover  position-relative " id='${i}'>
                            <i class="fa-solid fa-house-laptop "></i>
                            <h1 class="w-100">${dataArr[i].strArea}</h1>
                        </div>
                    </div>
        `
    }
    $('.row').html(box)
    $('i.fa-house-laptop').click(function (e) {
        console.log(e.target.parentNode.id)
        get_area_meals_data(e.target.parentNode.id)
    })
    $('h1').click(function (e) {
        console.log(e.target.parentNode.id)
        get_area_meals_data(e.target.parentNode.id)
    })

}
async function get_area_meals_data(id) {
    let area = Area_name_arr[id];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response_json = await response.json();
    dataArr = response_json.meals

    display_any(dataArr)
}
//ingredient_display
$('.links_div').children(".class-m").click(function () {
    $('aside').animate({ left: `-${w}px` }, 500)
    $('#open_close_icon').html('<i class="fa-solid fa-bars"></i>')
    get_ingredient_data()
})
async function get_ingredient_data() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response_json = await response.json();
    let dataArr = response_json.meals
    console.log(dataArr)
    ingredient_display(dataArr)
}


let Ingred_name_arr = []
function ingredient_display(dataArr) {
    let box = ``
    if (dataArr != null) {
        for (let i = 0; i < 20; i++) {
            Ingred_name_arr.push(`${dataArr[i].strIngredient}`)
            box += `
      <div class="col-3 p-4 text-white">
                        <div class="mother_div_hover  position-relative text-center" id='${i}'>
                            <div  id='${i}' class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-drumstick-bite"></i></div>
                            <h1 class="w-100 ">${dataArr[i].strIngredient}</h1>
                            <p>${dataArr[i].strDescription.substring(0, 100)}</p>
                        </div>
                    </div>
      
      `

        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    $('.col-3').remove()

    $('.row').append(box)
    $('.mother_div_hover').click(function (e) {

        console.log(e.target.parentNode.id)
        get_ingredients_meals_data(e.target.parentNode.id)
    })


}
async function get_ingredients_meals_data(id) {
    let ingred_name = Ingred_name_arr[id];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred_name}`)
    let response_json = await response.json();
    dataArr = response_json.meals

    display_any(dataArr)
}

//contact us
$('.links_div').children(".class-h").click(function () {
    $('aside').animate({ left: `-${w}px` }, 500)
    $('#open_close_icon').html('<i class="fa-solid fa-bars"></i>')
    display_form()
})
function display_form() {
    let box = ` <div class="container-fliud  d-flex flex-column justify-content-center align-items-center ">
            <div class="row w-75">
                <div class="col-6 p-2">
                    <input type="text" class="form-control" name="Name" placeholder="Enter Your Name" id="user_name">
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none" >Special characters and numbers not allowed</p>
                </div>
                <div class="col-6 p-2"><input type="email" class="form-control" name="email" placeholder="Enter Your Email" id="user_email">
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none">Email not valid *exemple@yyy.zzz</p>
                </div>
                <div class="col-6 p-2"><input type="text" class="form-control" name="phone-number"  placeholder="Enter Your Phone Number" id="user_phone">
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none">Enter valid Phone Number</p>
                </div>
                <div class="col-6 p-2"><input  class="form-control" name="age" type="number" min='1' max='99' name="Age"  placeholder="Enter Your Age" id='user_age'>
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none">Enter valid age</p>
                </div>
                <div class="col-6 p-2"><input type="password" class="form-control" name="Password" placeholder="Enter Your Password" id='user_password'>
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                </div>
                <div class="col-6 p-2"><input type="password" class="form-control"placeholder="repeat Your Password" name='repeated_password' id='user_password_repeat'>
                    <p class="p-3 error border border-0 rounded-2 my-2 d-none">Enter valid repassword</p>
                </div>
            </div>
            <button type="submit" class="btn btn-danger disabled" id='submit_button' >submit</button>

        </div>`
    $('main').html(box)
    $('#user_name').keyup(function () {

        form_validation('name')
        enable_button()
    })
    $('#user_email').keyup(function () {

        form_validation('user_email')
        enable_button()
    })
    $('#user_phone').keyup(function () {

        form_validation('user_phone')
        enable_button()
    })
    $('#user_age').keyup(function () {

        form_validation('user_age')
        enable_button()
    })
    $('#user_password').keyup(function () {

        form_validation('user_password')
        enable_button()
    })


    $('#user_password_repeat').keyup(function () {
        let password = $('#user_password_repeat').val()
        check(password)
        enable_button()
    })

    console.log($(`.error`))
}
function form_validation(param) {
    if (param == 'name') {
        let name_validator = /^[a-z]{3,}$/gi
        let name = $('#user_name').val()

        if (name_validator.test(name) == false) {

            $('#user_name').next().removeClass('d-none')
        }
        else {

            $('#user_name').next().addClass('d-none')
        }
    }
    else if (param == 'user_email') {
        let email_validator = /^[a-z]{3,}[@][a-z]{3,}[\.][a-z]{2,}$/gi
        let email = $('#user_email').val()

        if (email_validator.test(email) == false) {

            $('#user_email').next().removeClass('d-none')
        }
        else {

            $('#user_email').next().addClass('d-none')
        }
    }
    else if (param == 'user_phone') {
        let phone_validator = /^[0-9]{9,12}$/gi
        let phone = $('#user_phone').val()

        if (phone_validator.test(phone) == false) {

            $('#user_phone').next().removeClass('d-none')
        }
        else {

            $('#user_phone').next().addClass('d-none')
        }
    }
    else if (param == 'user_age') {
        let age_validator = /^[0-9]{1,2}$/gi
        let age = $('#user_age').val()

        if (age_validator.test(age) == false) {

            $('#user_age').next().removeClass('d-none')
        }
        else {

            $('#user_age').next().addClass('d-none')
        }
    }
    else if (param == 'user_password') {
        let password_validator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi
        let password = $('#user_password').val()

        if (password_validator.test(password) == false) {

            $('#user_password').next().removeClass('d-none')
        }
        else {

            $('#user_password').next().addClass('d-none')
        }
    }
}

function check(password) {
    let original_password = $('#user_password').val()
    // console.log(original_password)
    // console.log(password)
    if (original_password != password) {
        $('#user_password_repeat').next().removeClass('d-none')
    }
    else $('#user_password_repeat').next().addClass('d-none')
}
function enable_button() {


    for (let i = 0; i < 6; i++) {
        if ($('.error')[i].attributes.class.value.includes('d-none') &&
            $('.error').prev().eq(i).val() != ''
        ) {
            continue
        }
        else return false

    }
    console.log($('.error').prev().val())
    let new_class_text = $('#submit_button').attr('class').replace('disabled', '')
    $('#submit_button').attr("class", new_class_text)
    console.log('yes')
}
// let str='disabed button'
// let new_str=str.replace('disabed','')
// console.log(new_str)