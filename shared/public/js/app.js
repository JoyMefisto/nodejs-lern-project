$('document').ready(()=>{
    let dropdownPlayers = [];
    let listPlayers = [];
    /**
     * @title Ajax request
     */
    $('#js_input_search_players').on('keyup', (e) => {
        e.preventDefault();

        if($(e.target).val().split('').length <= 2) {
            containerHide('#js_results_dropdown_players');
            return;
        }

        let data = $('#js_form_search_players').serializeArray();

        $.ajax('/profile/teams/searchPlayer', {
            method: "POST",
            data: data,
            success(data, textStatus, jqXHR){
                (data.length > 0) ? buildListDropdownPlayers(data, '#js_results_dropdown_players') : buildNoResultOnSearchPlayer('#js_results_dropdown_players');
            }
        })
    });

    /**
     * @title Checked element in dropdown
     */
    $('#js_results_dropdown_players').on('click', function (e) {
        let elem = $(e.target);

        if(elem.is('.title')) {
            moveElementDropdown(elem.data('value'));
            $('#js_input_search_players').val('');
        }
    });

    /**
     * @title List Elements
     */
    function moveElementDropdown(obj) {
        console.log(typeof obj);

        listPlayers.push(obj);
        let viewElement = buildListView(obj);
        renderViewList(viewElement, '#js_results_list_players');
        containerHide('#js_results_dropdown_players');
    }
    function buildListView(obj) {
        return `<div class="item">
            <div class="content" value=${obj.id}>${obj.name}</div>
            <div class="content">
              <div class="ui button">Добавить</div>
              <div class="ui button red">Удалить</div>
            </div>
        </div>`
    }

    /**
     * @title Dropdown
     */
    function buildListDropdownPlayers(data, container) {
        console.log(data);
        // let newArr = deleteDublicateDropdownPlayers(data);

        // console.log(newArr);
        let view = data.length > 0 ? buildDropdownView(data) : buildNoResultOnSearchPlayer('#js_results_dropdown_players');

        renderView(view, container);
        containerShow(container);
    };

    function buildDropdownView(data) {
        return data.map(el => {
            return $(`<a class=result>
                        <div class=content>
                          <div class=title data-value=${JSON.stringify(el)}>${el.name}</div>
                        </div>
                      </a>`)
        });
    };

    function deleteDublicateDropdownPlayers(data) {
        // let newArr = listPlayers.concat(data);
        // return newArr.reduce((x, y) => x.findIndex(e => e.email == y.email) < 0 ? [...x, y] : x, []);

        let newArr = data.map(el => {
            console.log(el);
            return listPlayers.find(el);
        });

        console.log(newArr);

    }
});

function containerShow(container) {
    $(container).show();
}
function containerHide(container) {
    $(container).hide();
}

function buildNoResultOnSearchPlayer(container) {
    let result = buildViewNoResult();
    renderView(result, container);
    containerShow(container);
}
function buildViewNoResult() {
    return $(`<a class=result><div class=content><div class=title>Нет результата</div></div></a>`);
}

function renderView(view, container) {
    $(container).html(view);
};
function renderViewList(view, container) {
    $(container).append(view);
};