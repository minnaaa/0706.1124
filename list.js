function getPageno(){
    const param = new URLSearchParams(location.search);
    const pageno = parseInt(param.get('pageno'));
    if(isNaN(pageno))
        return 1;
    else if(pageno<1)
        return 1;
    return pageno;
}

async function fetch(pageno=1, pagesize=10){
    const api = 'http://sample.bmaster.kro.kr/contacts';
    const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
    try{
        return await $.ajax(url);
    }catch(err){
        console.log(err);
        return null;
    }
}

function printContacts(contacts){
    const $parent = $('#tbody');
    for(c of contacts){
        const html =`
        <tr>
            <td>${c.no}</td>
            <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
            <td>${c.tel}</td>
            <td>${c.address}</td>
        </tr>`;
    $parent.append(html);
    }
}

function getPagination({pageno, pagesize, totalcount, blocksize=5}){
    const countOfPage = Math.ceil(totalcount/pagesize);
    const prev = Math.floor((pageno-1)/blocksize)*blocksize;
    const start = prev+1;
    let end = prev + blocksize;
    let next = end +1;
    if(end>=countOfPage){
        end = countOfPage;
        next = 0;
    }
    return {prev, start, end, next, pageno};
}

function printPagination({prev, start, end, next, pageno}){
    const $parent = $('#pagination')
    if(prev>0){
        const html = `
        <li class = 'page-item'>
            <a class = 'page-link' href = 'list.html?pageno=${prev}'>이전으로</a>
        </li>`;
    $parent.append(html);
    }
    for(let i = start; i <=end; i++){
        const className = pageno === i? 'page-item active' : 'page-item';
        const html = `
        <li class = '${className}'>
            <a class = 'page-link' href = 'list.html?pageno=${i}'>${i}</a>
        </li>`;
    $parent.append(html);
    }
    if(next>0){
        const html = `
        <li class = 'page-item'>
            <a class = 'page-link' href = 'list.html?pageno=${next}'>다음으로</a>
        </li>`;
    }
}