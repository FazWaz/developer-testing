const { Property, sequelize } = require('../models');

const generateData = async () => {
  await sequelize.sync({ force: true });

  const imageUrls = [
    'https://s3.ap-southeast-1.amazonaws.com/cdn.baania.com/Baania2/listing/2021/December/29/main/1640792801802-D0A95E6E-528D-465A-B342-A325DCAEE96E.jpeg', // Example image URL 1
    'https://www.bangkokassets.com/property/714357/6396743_WEB.jpg', // Example image URL 2
    'http://www.primezone.co.th/wp-content/uploads/2023/03/999.jpg', // Example image URL 3
    'https://th1-cdn.pgimgs.com/listing/10999157/UPHO.117658479.V550/Bangkok-Boulevard-Chaengwattana-97-วา-ห้องมุม-ตกแต่งสวย-พร้อมอยู่-ปากเกร็ด-Thailand.jpg', // Example image URL 4
    'https://th1-cdn.pgimgs.com/project-listing-project/11088568/PLPHO.118747200.R400X300/The-Valor-Ramintra-เดอะ-เวลเลอร์-รามอินทรา-คันนายาว-Thailand.jpg',  // Example image URL 5
    'https://img.iproperty.com.my/thinkofliving/750x500-fit,format=webp/wp-content/uploads/1/2021/02/10163157/12.jpg',
    'https://i.ytimg.com/vi/l_6ew9nPq4M/sddefault.jpg',
    'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzg4NDU1ZDU3LTQ2NzEtNGZiZi04MDViLWMwMGVlNDRmOGRlOS82YTc3YWYyZC03ZGFiLTRiYzctYTc3Mi1mYzM3ODZlZTA5MWIuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
    'https://www.bangkokassets.com/property/590373/5314307_1%20PostWEB.jpg',
    'https://th1-cdn.pgimgs.com/listing/8336147/UPHO.80339188.V550/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7-2-%E0%B8%8A%E0%B8%B1%E0%B9%89%E0%B8%99-64-8-%E0%B8%95%E0%B8%A3-%E0%B8%A7%E0%B8%B2-%E0%B9%80%E0%B8%99%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%AE%E0%B8%A1-%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%9E%E0%B8%A5-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%B2%E0%B8%A0%E0%B8%B4%E0%B8%9A%E0%B8%B2%E0%B8%A5-5-%E0%B8%8B%E0%B8%AD%E0%B8%A2-82-%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%99-Thailand.jpg'
  ];

  const locations = ['Phuket', 'Chiangmai', 'Bangkok', 'Pattaya', 'Hua Hin'];

  const properties = [];
  for (let i = 1; i <= 10; i++) {
    const locationIndex = (i - 1) % locations.length; 
    const location = locations[locationIndex];
    properties.push({
      name: `House #${i}`,
      shortTitle: `${location} ${i}`,
      price: Math.floor(Math.random() * 1000000) + 100000, 
      bedrooms: Math.floor(Math.random() * 5) + 1, 
      area: parseFloat((Math.random() * 200 + 50).toFixed(2)),
      description: `Home 2 floors ${Math.floor(Math.random() * 5) + 1} bedrooms`,
      images: [imageUrls[i % imageUrls.length]], 
      type: i % 2 === 0 ? 'sale' : 'rent' 
    });
  }

  await Property.bulkCreate(properties);
  console.log('10 properties with images generated');
};

generateData().catch(error => {
  console.error('Error generating data:', error);
});
