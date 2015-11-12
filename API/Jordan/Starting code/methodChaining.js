function test(){
//********************************* OBJECT PROPERTIES *********************************
	this.canvasLocation = "";
	this.dataStructure = "";
	this.locationWidth = null;
	this.locationHeight = null;
	this._data = null;
	this.indexWidth = null;
	this.indexHeight = null;
	this.center = false;
	
//********************************* OBJECT FUNCTIONS *********************************
	//
	this.structure = function(dataStructure){
		this.dataStructure = dataStructure;
		return this;
	}
	
	this.data = function(array){
		this._data = array;
		console.log(this._data.length);
		return this;
	}
	
	this.location = function(node){
		this.canvasLocation = node;
		return this;
	}
	
	this.attr = function(str, num){
		if(str == "center" || str == "Center"){
			
		}
		
		else if(str == "index-width"){
			this.setIndexWidth(num);
		}
		
		else if(str == "index-height"){
			this.setIndexHeight(num);
		}
		
		return this;
	}
	
	this.setIndexWidth = function(number){
		this.indexWidth = number;
		return this;
	}	
	
	this.setIndexHeight = function(number){
		this.indexHeight = number;
		return this;
	}
	
	this.visualize = function(){
		
		//Make the canvas
		var canvas = d3.select(this.canvasLocation)
						.append("svg")
						.attr("width", 300)
						.attr("height", 600);
					
		//VISUALIZE THE ARRAY					
		for(var i = 0; i < this._data.length; ++i){
			canvas.selectAll("svg") 
					.data([1])
					.enter()
						.append("rect")
						.attr("width", this.indexWidth)
						.attr("height", this.indexHeight)
						.attr("y", 25) //200
						.attr("x", (i+1)*this.indexWidth)
						.attr("fill", "blue") 
						.attr("class", "shape")
						.attr("stroke-width", 4)
						.attr("stroke", "black");
			
	//DISPLAY THE DATA INSIDE THE CURRENT INDEX
			canvas.selectAll("svg")
					.data([1]) 
					.enter()
						.append("text")
						.text(this._data[i]) 			//Get the value located in the current array index
						.attr("class", "wrap")
						.attr("y", 25) 
						.attr("x", (i+1)*this.indexWidth)
						.attr("id", "rectWrap" + i)  //The ID is used by d3plus to find what text needs
															//to be overlapped with an SVG shape. That is why
															//I'm adding the "+ i" (keeps the ID's different)
						.attr("text-anchor", "middle");
						//.attr("opacity", 0);
		
		}
	
		//*******************************************NOTE THIS DOES NOT WORK CORRECTLY*******************************************
		//TIMEOUT NEEDED SO THAT D3PLUS WORKS AFTER THE TRANSITION OF EACH INDEX OCCURS
		setTimeout(function(){	
			for(var j = 0; j < this._data.length; ++j){
				//USE D3PLUS TO OVERLAP THE DATA WITH THE CORRECT ARRAY INDEX
				d3plus.textwrap()
						.container(d3.select("#rectWrap" + j)) //Selects the ID of each SVG text object of the array and overlaps the text with the shape
						.resize(true)  //Automatically resizes the text to fit the shape
						.draw();
			}
		}, 1000);
		
	
	}
}