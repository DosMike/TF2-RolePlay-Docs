var _request = (method, url, header, data) => {
	var r = new XMLHttpRequest();
	return new Promise((resolve, reject)=>{
		r.addEventListener('load', ()=>{
			if (r.status >= 200 && r.status < 300) {
				resolve(r);
			} else {
				reject(r);
			}
		});
		r.addEventListener('error', ()=>{
			reject(r);
		});
		
		r.open(method, url, true);
		r.overrideMimeType("text/plain; charset=UTF-8");
		
		let type = typeof(data) === 'undefined' ? 'Undefined' : data.__proto__.constructor.name;
		if (type === 'Object') {
			let d = new URLSearchParams();
			Object.keys(data).forEach(key=>
				d.set(key, data[key])
			);
			data = d;
		} else if (type !== 'FormData' && type !== 'URLSearchParams') {
			data = null;
		}
		
		if (typeof(header) != 'undefined') {
			Object.keys(header).forEach(key=>
				r.setRequestHeader(key,header[key])
			);
		}
		
		if (method == 'POST')
			r.send(data);
		else
			r.send();
	});
}
	

function Request() { }
Request.POST = (url, header, data) => _request('POST', url, header, data);
Request.PUT = (url, header, data) => _request('PUT', url, header, data);
Request.GET = (url, header) => _request('GET', url, header);
Request.HEAD = (url, header) => _request('HEAD', url, header);
Request.DELETE = (url, header) => _request('DELETE', url, header);