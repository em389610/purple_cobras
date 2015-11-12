"use strict";

function test(){

//********************************* TEST PROPERTIES *********************************
    this.dataStructure;				//Data Structure being visualized. NOTE: This is an object NOT a string
    this.dataStructureName = "";    //NOTE: This is a string containing the name of the structure
    this.canvasLocation = "";   	//Location in HTML file to display visualization
    this.locationWidth = null;  	//Width of the location ^
    this.locationHeight = null; 	//Height of the location ^^
    this.canvas;

//********************************* SUB-OBJECT ARRAY *********************************
    function array(){
        //********************************* ARRAY PROPERTIES *********************************
        this.data = [];				//The array to be visualized
        this.indexWidth = null;		//Width of each index visually
        this.indexHeight = null;    //Height of each index visually
		this.plane = "horizontal";  //By default the array is displayed horizontally
		this.y = null;				
		this.x = null;
		this.indexColor = "white"; 	//Default color is white
		this.textColor = "black";   //Default color is black

        //********************************* ARRAY FUNCTIONS *********************************
        //Stores the passed array (A) as the data for the object
        this.data = function(A){
            this.data = A.slice(0, A.length);		//DEEP COPY THE ARRAY
        }

        //Stores the passed value (number) as the width of each index
        this.setIndexWidth = function(number){
            this.indexWidth = number;
        }

        //Stores the passed value (number) as the height of each index
        this.setIndexHeight = function(number){
            this.indexHeight = number;
        }
		//Sets the plane used to visualize (vertical or horizontal plane)
		this.setPlane = function(p){
			this.plane = p;
		}
		//Stores the color to be used as the background for each rectangle
		this.setIndexColor = function(color){
			this.indexColor = color;
		}
		
		this.setTextColor = function(color){
			this.textColor = color;
		}
	
    } //End of Array Object



    function speed(){
        this.speed1 = 0;
        this.speed2 = 0;
        this.speed3 = 0;
        this.div1 = document.getElementById('rate1Div');
        this.div2 = document.getElementById('rate2Div');
        this.div3 = document.getElementById('rate3Div');


        this.data = function(rate) {
            this.speed1 = rate.rate1;
            this.speed2 = rate.rate2;
            this.speed3 = rate.rate3;
        }

    }


//********************************* TEST FUNCTIONS *********************************
    //Function to determine what data structure is to be visualized
    //Contains some error checking to make sure the developer can find their mistake easier
    this.structure = function(structure){
        try{
            if(structure == "array" || structure == "Array"){
                this.dataStructure = new array();				//Makes this.dataStructure an array object
                this.dataStructureName = "array";				//This will be used in the visualize() function
                return this;
            } else if (structure == "speed") {
                this.dataStructure = new speed();
                this.dataStructureName = "speed";
                return this;
            }
            else{
                throw "Entered a structure not currently supported."		//Developer entered something not supported by the API
            }
        }

        catch(err){
            console.log(err)
        }
    }

    //Function to store the input data
    this.data = function(x){
		if(this.dataStructureName == "array"){
			this.dataStructure.data = x.slice(0, x.length);		//The extra .data is an ARRAY OBJECT PROPERTY because this.dataStructure is an ARRAY OBJECT itself.
		} else if (this.dataStructureName == "speed") {
            this.dataStructure.speed1 = x.rate1;
            this.dataStructure.speed2 = x.rate2;
            this.dataStructure.speed3 = x.rate3;

        }
        return this;
    }

    //Function to store the location + locationHeight + locationWidth in HTML file
    this.location = function(node){
        this.canvasLocation = node;
        this.locationWidth = $(node).width();	//Calculates the width of the specified location
        this.locationHeight = $(node).height(); //Calculates the height of the specified location
        console.log("in location 1)size of canvas: " + this.locationWidth + " " + this.locationHeight);
        return this;
    }

    //Function to update the visualization based on new data
    this.update = function(_data){
        if (this.dataStructureName == "array") 
		{
            var temp = false;
            temp = arraysEqual(_data, this.dataStructure.data);		//Determine if the old data == new data

            if(temp){
                //Data was the same so do nothing
				return this;
            }

            else{
            	this.data(_data);							//Store the new data into the API object
            	this.canvas.selectAll("rect").remove();		//Removes the old SVG rectangles
            	this.canvas.selectAll("text").remove();		//Removes the old data from the screen
            	d3.select("#canvasArray").remove();			//Delete the canvas: NOTE THIS USES THE ID (canvasID) FOR THE CANVAS MADE IN THE VISUALIZE FUNCTION
            	this.visualize();							//visualizes the updated structure
            }
        } else if (this.dataStructureName == "speed") {
			d3.select("#canvasSpeed").remove();
            this.dataStructure.speed1 = _data.rate1;
            this.dataStructure.speed2 = _data.rate2;
            this.dataStructure.speed3 = _data.rate3;

            this.visualize();

        }
	return this;
    }//End of update function

    //Function to construct the visualization
    this.visualize = function(){

        //***************************************************VISUALIZES AN ARRAY. MORE STRUCTURES CAN/SHOULD BE ADDED TO THIS FUNCTION***************************************************
        if(this.dataStructureName == "array"){
			this.canvas = d3.select(this.canvasLocation)		//Finds the specified location of the HTML file and appends a "canvas" to it
            .append("svg")
            .attr("id", "canvasArray")
            .attr("width", this.locationWidth)
            .attr("height", this.locationHeight);
            

			visualizeArray(this); //Moved the visulization code to non-member function to reduce some clutter

        } //End of  if dataStructure == array
        else if (this.dataStructureName == "speed") {
			this.canvas = d3.select(this.canvasLocation)		//Finds the specified location of the HTML file and appends a "canvas" to it
            .append("svg")
            .attr("id", "canvasSpeed")
            .attr("width", this.locationWidth)
            .attr("height", this.locationHeight);
			
            var div1 = this.dataStructure.div1;
            var div2 = this.dataStructure.div2;
            var div3 = this.dataStructure.div3;

            div1.style.backgroundColor = 'green';
            div2.style.backgroundColor = 'yellow';
            div3.style.backgroundColor = 'pink';

            var vec1 = this.dataStructure.speed1;
            var vec2 = this.dataStructure.speed2;
            var vec3 = this.dataStructure.speed3;

            //console.log("in visualize: rates: " + vec1 + " " + vec2 + " " + vec3);

            switch(vec1) {
                case 1:
                    div1.style.backgroundColor = 'green';
                    break;
                case 2:
                    div1.style.backgroundColor = 'blue';
                    break;
                case 3:
                    div1.style.backgroundColor = 'yellow';
                    break;
                case 4:
                    div1.style.backgroundColor = 'pink';
                    break;
                case 5:
                    div1.style.backgroundColor = 'red';
                    break;
                default:
                    div1.style.backgroundColor = 'white';
                    break;

            }

            switch(vec2) {
                case 1:
                    div2.style.backgroundColor = 'green';
                    break;
                case 2:
                    div2.style.backgroundColor = 'blue';
                    break;
                case 3:
                    div2.style.backgroundColor = 'yellow';
                    break;
                case 4:
                    div2.style.backgroundColor = 'pink';
                    break;
                case 5:
                    div2.style.backgroundColor = 'red';
                    break;
                default:
                    div2.style.backgroundColor = 'white';
                    break;

            }

            switch(vec3) {
                case 1:
                    div3.style.backgroundColor = 'green';
                    break;
                case 2:
                    div3.style.backgroundColor = 'blue';
                    break;
                case 3:
                    div3.style.backgroundColor = 'yellow';
                    break;
                case 4:
                    div3.style.backgroundColor = 'pink';
                    break;
                case 5:
                    div3.style.backgroundColor = 'red';
                    break;
                default:
                    div3.style.backgroundColor = 'white';
                    break;

            }
            //


        }
	return this;
    } //End of visualize function

	//Function to change the "attributes" of the visualizations
	this.attr = function(keyword1, keyword2){
		if(this.dataStructureName == "array")	//Looking at attributes for visualizations of arrays
		{
			//Attribute to change which plane the visualization occurs on
			if(keyword1 == "plane" || keyword1 == "Plane")
			{
				if(keyword2 == "vertical" || keyword2 == "Vertical" || keyword2 == "Horizontal" || keyword2 == "horizontal")
				{
					this.dataStructure.setPlane(keyword2);
				}
				
				else{
					console.log(keyword2 + " does not match the attribute " + keyword1);
				}
			}//End of keyword1 == plane
			
			//Attribute to change the color of each index of the array
			if(keyword1 == "index-color" || keyword1 == "Index-Color" || keyword1 == "index-Color" || keyword1 == "Index-color")
			{
				this.dataStructure.setIndexColor(keyword2);
			}
			
			//Attribute to change the color of the text (data) shown in each index of the array
			if(keyword1 == "text-color" || keyword1 == "Text-color" || keyword1 == "Text-Color" || keyword1 == "text-Color")
			{
				this.dataStructure.setTextColor(keyword2);
			}
			
		}//End of if name == array
		
	return this;
	}//End of attr function

} //End of Test (API) Object



//********************BELOW THIS ARE NON MEMBER FUNCTIONS OF THE API TO HELP VISUALIZE THE ARRAY********************

//A function used to determine if two arrays are the same
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

//A function to visualize the array
//NOTE: Contains two variations - (1) Horizontal visualization (2) Vertical visualization
function visualizeArray(object){
	
	get_XY(object);
	
	//Visualize the array horizontally
	if(object.dataStructure.plane == "horizontal" || object.dataStructure.plane == "Horizontal"){
		 for(var i = 0; i < object.dataStructure.data.length; ++i){
                object.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("rect")											//Appends a rectangle to the canvas
                    .attr("width", object.dataStructure.indexWidth)			//Sets the width of each rectangle
                    .attr("height", object.dataStructure.indexHeight)		//Sets the height of each rectangle
                    .attr("y", object.dataStructure.y)						//Sets the y coordinate
                    .attr("x", i * object.dataStructure.indexWidth)			//Sets the x coordinate
                    .attr("fill", object.dataStructure.indexColor)		//Sets the background color of each rectangle
                    .attr("class", "shape")									//Sets a class name for each rectangle
                    .attr("stroke-width", 2)								//Sets the border-width of each rectangle
                    .attr("stroke", "black");								//Sets the color of the border

                object.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("text")
                    .text(object.dataStructure.data[i])
                    .attr("class", "wrap")
					.attr("id", "rectWrap" + i)
                    .attr("y", object.dataStructure.y)
                    .attr("x", i * object.dataStructure.indexWidth)
					.attr("fill", object.dataStructure.textColor)
                    .attr("text-anchor", "middle");
            }//end of for loop
	}
	
	//Visualize the array vertically
	else{
		 for(var i = 0; i < object.dataStructure.data.length; ++i){
                object.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("rect")
                    .attr("width", object.dataStructure.indexWidth)
                    .attr("height", object.dataStructure.indexHeight)
                    .attr("y", object.dataStructure.indexHeight * i)
                    .attr("x", object.dataStructure.x)
                    .attr("fill", object.dataStructure.indexColor)
                    .attr("class", "shape")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");

                object.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("text")
                    .text(object.dataStructure.data[i])
                    .attr("class", "wrap")
					.attr("id", "rectWrap" + i)
                    .attr("y", object.dataStructure.indexHeight * i)
                    .attr("x", object.dataStructure.x)
					.attr("fill", object.dataStructure.textColor)
                    .attr("text-anchor", "middle");
            }//end of for loop
	}
	
	//This will be done no matter what plane the array is visualized on
	 for(var j = 0; j < object.dataStructure.data.length; ++j){
                //USE D3PLUS TO OVERLAP THE DATA WITH THE CORRECT ARRAY INDEX
                d3plus.textwrap()
                    .container(d3.select("#rectWrap" + j)) //Selects the ID of each SVG text object of the array and overlaps the text with the shape
                    .resize(true)  //Automatically resizes the text to fit the shape
                    .draw();
            }
	
}//End of visualizeArray function

function get_XY(object){
	var h = object.locationHeight;
	var w = object.locationWidth;
	var len = object.dataStructure.data.length;
	if(object.dataStructure.plane == "Horizontal" || object.dataStructure.plane == "horizontal")
	{
		//Case the developer doesn't give a width
		if(w == 0){
			console.log("Please enter a width for the location: " + object.canvasLocation + ". Otherwise this cannot be visualized horizontally.");
		}
		//Case of the developer not giving a height
		else if(h == 0){
			if(w / len > 100){
				object.dataStructure.setIndexWidth(100);
				object.dataStructure.setIndexHeight(100);
			}
			else{
				object.dataStructure.setIndexWidth(w/len);
				object.dataStructure.setIndexHeight(w/len);
			}
			object.dataStructure.y = 2;
			object.canvas.attr("height", object.dataStructure.indexHeight + 8 );
		}
		//Case of the developer giving both a width and height
		else{
			if(w / len > 100){
				object.dataStructure.setIndexWidth(100);
				object.dataStructure.setIndexHeight(100);
			}
			
			//Case where the size of each index is larger than the allowable height
			else if(w / len > h){
				object.dataStructure.setIndexWidth(h-4);
				object.dataStructure.setIndexHeight(h-4);
			}
			
			else{
				object.dataStructure.setIndexWidth(w/len);
				object.dataStructure.setIndexHeight(w/len);
			}
			object.dataStructure.y = h / 2 - object.dataStructure.indexHeight / 2;	//Centers the visualization vertically
		}
	}
	
	//Want to visualize on the vertical plane
	else{
		//Case of developer not giving a height
		if(h == 0){
			console.log("Please enter a height for the location: " + object.canvasLocation + ". Otherwise this cannot be visualized vertically.");
		}
		
		//Case of developer not giving a width
		else if(w == 0){
			if(h / len > 100){
				object.dataStructure.setIndexWidth(100);
				object.dataStructure.setIndexHeight(100);
			}
			else{
				object.dataStructure.setIndexWidth(h/len);
				object.dataStructure.setIndexHeight(h/len);
			}
			object.dataStructure.x = 2;
			object.canvas.attr("width", object.dataStructure.indexWidth + 8 );			
		}
		
		//Case of developer giving both height and width
		else{
			if(h / len > 100){
				object.dataStructure.setIndexWidth(100);
				object.dataStructure.setIndexHeight(100);
			}
			//Case where the size of each index is larger than the allowable width
			else if(h / len > w){
				object.dataStructure.setIndexWidth(w-4);
				object.dataStructure.setIndexHeight(w-4);
			}
			
			else{
				object.dataStructure.setIndexWidth(h/len);
				object.dataStructure.setIndexHeight(h/len);
			}
			object.dataStructure.x = w / 2 - object.dataStructure.indexWidth / 2;	//Centers the visualization horizontally
		}
	}
}//End of get_XY function