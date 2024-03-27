$(document).on('click', '#copyFromQR, #copyUrl', function (e) {
    e.preventDefault();
    const input = document.getElementById('subUrl');
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    $("#qrModal").modal('hide');
    alert('آدرس در کلیپ‌بورد کپی شد.');
});

let source = 'yebekhe/TVC';
$(document).on('click', 'a[data-loc]', function (e) {
    e.preventDefault();
    let location = $(this).data('loc');
    let title = location.toUpperCase();
    $('#countryLoc a').removeClass('active');
    $(this).addClass('active');
    let config = 'https://raw.githubusercontent.com/'+source+'/main/subscriptions/location/normal/'+title;
    $('#qrcode img').attr('src', "https://quickchart.io/qr/?size=300x200&light=ffffff&text="+encodeURIComponent(config));
    $('#qrModal h4').html('QRCode ('+title+')');
    $('#qrcode input').val(config);
    $("#qrModal").modal('show');
});

$('#qrModal').on('hidden.bs.modal', function () {
    $('#countryLoc a').removeClass('active');
});

window.addEventListener('load', function() {
    fetch('https://api.github.com/repos/yebekhe/TVC/contents/subscriptions/location/normal')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let locationPaths = data.filter(item => !item.path.includes("XX"));
            locationPaths = locationPaths.map(item => item.name);
            let html = '';
            locationPaths.forEach(function(element) {
                html += '<a href="" data-loc="'+element.toLowerCase()+'">';
                html += '<div class="slide">';
                html += '<img src="./assets/img/flags/'+element.toLowerCase()+'.svg?v1.1" alt="'+element+'" />';
                html += '<p dir="auto">'+element+'</p>';
                html += '</div>';
                html += '</a>';
            });
            $('#countryLoc').html(html);
        })
        .catch(error => {
            let html = '';
            let locationPaths = ["IR", "TR", "GB", "US", "PL", "FI", "SE", "DE", "FR"];
            locationPaths.forEach(function(element) {
                html += '<a href="" data-loc="'+element.toLowerCase()+'">';
                html += '<div class="slide">';
                html += '<img src="./assets/img/flags/'+element.toLowerCase()+'.svg?v1.1" alt="'+element+'" />';
                html += '<p dir="auto">'+element+'</p>';
                html += '</div>';
                html += '</a>';
            });
            $('#countryLoc').html(html);
        });
});