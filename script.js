getData()

async function getData() {
    try {
        const response = await fetch(
            'https://api.fbi.gov/wanted/v1/list', 
          {
             headers: { 'Access-Control-Allow-Origin': '*'}
          }  
            
             
        );

        if (!response.ok) {
            throw new Error('Failed to fetch cat images');
        }

        const data = await response.json();
        console.log(data)


        // frame.innerHTML = '';
        // currentItem = 0;

        // data.forEach((cat, index) => {
        //     const li = document.createElement('li');
        //     const img = document.createElement('img');

        //     img.src = cat.url;
        //     img.alt = 'Cat image ' + (index + 1);

        //     if (index === 0) {
        //         li.classList.add('active');
        //     }

        //     li.appendChild(img);
        //     frame.appendChild(li);
        // });

        // totalItems = frame.querySelectorAll('li').length;

    } catch (error) {
        console.error('Error fetching cat images:', error);
    }
}
