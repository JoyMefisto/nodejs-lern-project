Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

$('document').ready(()=>{
    let searchPlayers = [];

    function containerShow(container) {
        $(container).show();
    }
    function containerHide(container) {
        $(container).hide();
    }

    $('#js_input_search_players').on('keyup', (e) => {
        e.preventDefault();

        if($(e.target).val().split('').length <= 2) {
            containerHide('#js_results_search_players');
            return;
        }

        let data = $('#js_form_search_players').serializeArray();

        $.ajax('/profile/teams/searchPlayer', {
            method: "POST",
            data: data,
            success(data, textStatus, jqXHR){
                console.log(data);
                (data.length > 0) ? buildListSearchPlayers(data, '#js_results_list_players') : buildNoResultOnSearchPlayer('#js_results_search_players');
            }
        })
    });

    $('#js_results_search_players').on('click', function (e) {
        let elem = $(e.target);

        if(elem.is('.title')) {
            elem.closest('.results').prev().val(elem.text());
            containerHide(this);
        }
    });

    // function updateSearchPlayers(data) {
    //     console.log(data);
    //     console.log(searchPlayers);
    //     if(searchPlayers.length === 0) {
    //         searchPlayers = searchPlayers.concat(data);
    //     } else {
    //         searchPlayers = searchPlayers.map(el => {
    //             return data.map(ael => {
    //                 if(ael.email !== el.email) return ael;
    //             })
    //         })
    //     }
    //     console.log(searchPlayers);
    //     // Object.assign({},searchPlayers, data);
    //     return searchPlayers;
    // }

    function buildNoResultOnSearchPlayer(container) {
        let result = buildViewNoResult();
        renderView(result, container);
        containerShow(container);
    }
    function buildListSearchPlayers(data, container) {
        // let objUpdateSearchPlayers = updateSearchPlayers(data);
        let view = buildView(data);
        renderView(view, container);
        containerShow(container);
    };

    function buildViewNoResult() {
        return $(`<a class=result><div class=content><div class=title>Нет результата</div></div></a>`);
    }
    function buildView(data) {
        return data.map(el => {
            return `<div class="item">
                <div class="content" value=${el.id}>${el.name}</div>
                <div class="content">
                  <div class="ui button">Добавить</div>
                  <div class="ui button red">Удалить</div>
                </div>
            </div>`
        });

    }

    function renderView(view, container) {
        $(container).html(view);
    }



});