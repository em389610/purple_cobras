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
		this.data = null;			//The array to be visualized
		this.indexWidth = null;		//Width of each index visually
		this.indexHeight = null;    //Height of each index visually
		
	//********************************* ARRAY FUNCTIONS *********************************
		//Stores the passed array (A) as the data for the object
		this.data = function(A){
			this.data = A;
			//return this;
		}
		
		//Stores the passed value (number) as the width of each index 
		this.setIndexWidth = function(number){
			this.indexWidth = number;
			//return this;
		}	
		
		//Stores the passed value (number) as the height of each index
		this.setIndexHeight = function(number){
			this.indexHeight = number;
			//return this;
		}		
	} //End of Array Object

//********************************* TEST FUNCTIONS *********************************
	//Function to determine what data structure is to be visualized
	//Contains some error checking to make sure the developer can find their mistake easier
	this.structure = function(structure){
		try{
			if(structure == "array" || structure == "Array"){
				this.dataStructure = new array();				//Makes this.dataStructure an array object
				this.dataStructureName = "array";				//This will be used in the visualize() function
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
		this.dataStructure.data = x;		//The extra .data is an ARRAY OBJECT PROPERTY because this.dataStructure is an ARRAY OBJECT itself.
		this.check();
		return this;
	}
	
	//Function to store the location + locationHeight + locationWidth in HTML file
	this.location = function(node){
		this.canvasLocation = node;
		this.locationWidth = $(node).width();	//Calculates the width of the specified location
		this.locationHeight = $(node).height(); //Calculates the height of the specified location
		return this;
	}
	
	//Function to update the visualization based on new data
	this.update = function(arr){
			//this.check();
			console.log("Array to visualize = " + arr);
			//var temp = true;
			//temp = arraysEqual(arr, this.dataStructure.data);		//Determine if the old data == new data
			
			/*
			if(temp){
				//Data was the same so do nothing
				;
			}
			*/
			//else if(temp != true){
				this.data(arr);								//Store the new data into the API object
				this.canvas.selectAll("rect").remove();		//Removes the old SVG rectangles
				this.canvas.selectAll("text").remove();		//Removes the old data from the screen
				d3.select("#canvasID").remove();
				this.visualize();							//visualizes the updated structure
				this.check();
			//}
			
		}
	
	//Function to construct the visualization
	this.visualize = function(){
		
		this.canvas = d3.select(this.canvasLocation)		//Finds the specified location of the HTML file and appends a "canvas" to it
						.append("svg")
						.attr("id", "canvasID")
						.attr("width", this.locationWidth)
						.attr("height", this.locationHeight);
				
		//***************************************************VISUALIZES AN ARRAY. MORE STRUCTURES CAN/SHOULD BE ADDED TO THIS FUNCTION***************************************************
		if(this.dataStructureName == "array"){
			/*	
			var tempCanvasHeight = ((this.locationWidth) / this.dataStructure.data.length) * 2;	//Makes the height of the canvas 2 * width of the canvas
			if(this.locationHeight == 0){
				
				this.locationHeight = tempCanvasHeight;
				this.canvas.attr("height", this.locationHeight);
				
				this.dataStructure.setIndexHeight( tempCanvasHeight / 2 );							//Division by 2 to cancel out the multiplication above
				this.dataStructure.setIndexWidth( tempCanvasHeight / 2 );
			}
			*/
			//this.dataStructure.setIndexHeight( tempCanvasHeight / 2 );							//Division by 2 to cancel out the multiplication above
			//this.dataStructure.setIndexWidth( tempCanvasHeight / 2 );
			this.dataStructure.setIndexWidth( this.locationWidth / this.dataStructure.data.length );
			this.dataStructure.setIndexHeight( this.locationWidth / this.dataStructure.data.length );
			this.canvas.attr("height", this.dataStructure.indexHeight * 2);
	
			for(var i = 0; i < this.dataStructure.data.length; ++i){
				this.canvas.selectAll("svg") 
						.data([1])
						.enter()
							.append("rect")
							.attr("width", this.dataStructure.indexWidth)
							.attr("height", this.dataStructure.indexHeight)
							.attr("y", this.dataStructure.indexHeight - (this.dataStructure.indexHeight/2)) //"centers" the rectangles vertically
							.attr("x", i * this.dataStructure.indexWidth)
							.attr("fill", "white")
							.attr("class", "shape")
							.attr("stroke-width", 2)
							.attr("stroke", "black");
							
				this.canvas.selectAll("svg")
						.data([1])
						.enter()
							.append("text")
							.text(this.dataStructure.data[i]) 	
							.attr("class", "wrap")
							.attr("y", this.dataStructure.indexHeight - (this.dataStructure.indexHeight/2)) 
							.attr("x", i * this.dataStructure.indexWidth)
							.attr("id", "rectWrap" + i)  
							.attr("text-anchor", "middle");	
			}//end of for loop
			
			for(var j = 0; j < this.dataStructure.data.length; ++j){
				//USE D3PLUS TO OVERLAP THE DATA WITH THE CORRECT ARRAY INDEX
				d3plus.textwrap()
						.container(d3.select("#rectWrap" + j)) //Selects the ID of each SVG text object of the array and overlaps the text with the shape
						.resize(true)  //Automatically resizes the text to fit the shape
						.draw();
			}
			
		} //End of  if dataStructure == array	
	} //End of visualize function

		
		this.check = function(){
			console.log("check: " + this.dataStructure.data);
		}
} //End of Test Object

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}