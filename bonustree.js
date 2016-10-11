interface DomNode {
    value: string;
    subnodes?: Array<DomNode>;
}

function isSubtree(dom: DomNode, vdom: DomNode): boolean {
	var domLen, vdomLen, i;
	
	//First check if the node values match
	if (dom.value == vdom.value) {
		
		//Now make sure they both have subnodes, and if so, loop through
		if (dom.subnodes && vdom.subnodes) {
			domLen = dom.subnodes.length;
			vdomLen = vdom.subnodes.length;

			//If any subnodes are not a match, return false; otherwise keep checking recursively
			if (domLen == vdomLen) {
				for (i = 0; i < domLen; i++) {
					if (!isSubtree(dom.subnodes[i], vdom.subnodes[i])) {
						return false;
					}
				}
				
				return true;
			} else {
				//If there are different numbers of subnodes, the subnodes of the dom must still be checked, because there could be duplicate values
				if (checkSubNodes(dom, vdom, domLen)) {
					return true;
				}
			}
		//If the nodes are the same and there are no subnodes, this node is a perfect match
		} else if (!dom.subnodes && !vdom.subnodes){
			return true;
		}
	} else {
		//If this node isn't a match, still check the subnodes of the dom
		if (dom.subnodes) {	
			if (checkSubNodes(dom, vdom, dom.subnodes.length)) {
				return true;
			}
		}
	}
	
	return false;
}

function checkSubNodes(dom: DomNode, vdom: DomNode, len: Number): boolean {
	var i, result;
	
	for (i = 0; i < len; i++) {
		if (isSubtree(dom.subnodes[i], vdom)) {
			return true;
		}
	}
	
	return false;
}

//Dom with unique values
const dom: DomNode = {
	value: "root",
	subnodes: [
		{
			value: "a",
			subnodes: [
				{
					value: "e"
				},
				{
					value: "f",
					subnodes: [
						{
							value: "j"
						},
						{
							value: "k"
						},
						{
							value: "l",
							subnodes: [
								{
									value: "m"
								},
								{
									value: "n"
								},
								{
									value: "o"
								}
							]
						}
					]
				},
				{
					value: "g",
					subnodes: [
						{
							value: "x",
							subnodes: [
								{
									value: "y"
								},
								{
									value: "z"
								}
							]
						}
					]
				}
			]
		},
		{
			value: "b",
			subnodes: [
				{
					value: "h"
				}
			]
		},
		{
			value: "c",
			subnodes: [
				{
					value: "i"
				}
			]
		},
		{
			value: "d",
		}
	]
}

//Dom with repeated values ("n")
const dom2: DomNode = {
	value: "root",
	subnodes: [
		{
			value: "a"
		},
		{
			value: "b"
		},
		{
			value: "n",
			subnodes: [
				{
					value: "n",
					subnodes: [
						{
							value: "o",
							subnodes: [
								{
									value: "g"
								},
								{
									value: "x"
								}
							]
						},
						{
							value: "y",
							subnodes: [
								{
									value: "z"
								}
							]
						}
					]
				},
			]
		}
	]
}

//Case 1: a true subtree; expected to return true
const vdom1: DomNode = {
	value: "f",
	subnodes: [
		{
			value: "j"
		},
		{
			value: "k"
		},
		{
			value: "l",
			subnodes: [
				{
					value: "m"
				},
				{
					value: "n"
				},
				{
					value: "o"
				}
			]
		}
	]
}

//Case 2: similar hierarchy but missing child nodes; expected to return false
const vdom2: DomNode = {
	value: "a",
	subnodes: [
		{
			value: "e"
		},
		{
			value: "f",
			subnodes: [
				{
					value: "j"
				},
				{
					value: "k"
				},
				{
					value: "l",
					subnodes: [
						{
							value: "m"
						},
						{
							value: "n"
						},
						{
							value: "o"
						}
					]
				}
			]
		},
		{
			value: "g",
		}
	]
}

//Case 3: similar data but different hierarchy of nodes; expected to return false
const vdom3: DomNode = {
	value: "n",
	subnodes: [
		{
			value: "o",
			subnodes: [
				{
					value: "g"
				},
				{
					value: "x"
				}
			]
		},
		{
			value: "y",
			subnodes: [
				{
					value: "z"
				}
			]
		}
	]
}

console.log(isSubtree(dom, vdom1));
console.log(isSubtree(dom, vdom2));
console.log(isSubtree(dom, vdom3));
console.log(isSubtree(dom2, vdom3));