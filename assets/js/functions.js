---
---

$(document).ready(function() {

    if ($(location).attr('pathname') == '/cindy-cournoyer/voyages/') {
        var map = new Datamap({
          element: document.getElementById("map"),
          done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
                console.log(geo.id);
                filterCountry(geo.id);
                  });
        },
          responsive: true,
          fills: {
              VISITED: '#afe8f9',
              defaultFill: 'rgb(240, 240, 245)'
          },
          data: {
              {% for post in site.posts %}{% if post.country != "" %}
                  {{post.country}}: {
                      fillKey: 'VISITED',
                      visible: true,
                      class: '{{country.class}}'
                  }
                  {% if forloop.last == false %},{% endif %}
              {% endif %}{% endfor %}
          },
          geographyConfig: {
              popupTemplate: function(geo, data) {
                  if (data.visible) {
                      return ['<div class="hoverinfo"><strong>',
                            'Filter articles by country: ' + geo.properties.name,
                            '</strong></div>'].join('');
                    }
              },
              popupOnHover: true,
              highlightOnHover: true,
              highlightFillColor: '#3977db',
              highlightBorderColor: '#FDFDFD',
              highlightBorderWidth: 2
          }
        });

        function filterCountry(country) {
            $( '.articles' ).each(function(){
                if ( ( $(this).hasClass(country) && !$(this).hasClass('active') ) ||
                     ( !$(this).hasClass(country) && $(this).hasClass('active') ) ) {
                         $(this).toggleClass('active');
                }
            });
        }
        $('#reset').click(function(){
            $( '.articles' ).each(function(){
                if ( !$(this).hasClass('active') ) {
                    $(this).toggleClass('active');
                }
            });
        });

        $(window).on('resize', function() {
            if ($(location).attr('pathname') == '/voyages/') {
               map.resize();
           }
        });

    }

    else if ( ($(location).attr('pathname') == '/cindy-cournoyer/') || ($(location).attr('pathname') != '/cindy-cournoyer/voyages/') ) {

        var slides = 0;
        if ($(location).attr('pathname') == '/cindy-cournoyer/') {
            slides = 4;
        }
        else {
            slides = 2;
        }

        $('.products').slick({
              infinite: true,
              slidesToShow: slides,
              slidesToScroll: 1
        });

        $('.hero').slick({
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 5000
        });

        $('.product-view').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
      });

      $(window).on('shown.bs.modal', function() { 
        $('.product-view').slick('setPosition');
    });

        $.get(
            "https://www.googleapis.com/youtube/v3/channels", {
                'key': 'AIzaSyCH9uegrmbONbiAPmKphadz4Z_PIKdYGCM',
                'id': 'UCUeFEUJ7mUl3QXUhRVdm_dg',
                'part': 'contentDetails'},
                function(data) {
                    $.each(data.items, function(i, item){
                        console.log(item);
                        pid = item.contentDetails.relatedPlaylists.uploads;
                        getVideo(pid);
                    })
                }
        );

        function getVideo(pid) {
            $.get(
                "https://www.googleapis.com/youtube/v3/playlistItems", {
                    'key': 'AIzaSyCH9uegrmbONbiAPmKphadz4Z_PIKdYGCM',
                    'playlistId': pid,
                    'maxResults': 1,
                    'part': 'snippet'},
                    function(data) {
                        var output;
                        var vid;
                        $.each(data.items, function(i, item){
                            vid = item.snippet.resourceId.videoId;
                            output = 'https://www.youtube.com/embed/' + vid;
                            $('#video').attr("src", output);
                        });
                    }
            );
        }
    }
    
});
