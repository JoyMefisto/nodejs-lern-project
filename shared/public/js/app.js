$('document').ready(()=>{
    let dropdownPlayers = [];
    let listPlayers = [];

    $('#js_results_list_players').on('click', (e) => {
        let btnRemove = $(e.target);

        if(btnRemove.is('.js_remove')) {
            btnRemove.closest('.item').remove();
        }
    });


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
            data: data[1],
            success(result, textStatus, jqXHR){
                (result.length > 0) ? buildListDropdownPlayers(result, '#js_results_dropdown_players') : buildNoResultOnSearchPlayer('#js_results_dropdown_players');
            }
        })
    });

    $('#js_form_search_players').on('click', '.js_add', (e) => {
        let
            event = $(e.currentTarget),
            item = event.closest('.item'),
            value = item.find('[name=player_id]').data('value'),
            form = event.closest('form'),
            url = form.attr('action'),
            team_id = form.find('[name=team_id]').attr('value');

        let data = {
            player_id: value._id,
            team_id: team_id,
            value
        };

        $.ajax(url, {
            method: "POST",
            data,
            success(result, textStatus, jqXHR) {
                let view = addedViewPlayerOnTeam(data);
                renderViewList(view, '#js_list_players');
                item.remove();
            }
        })
    });

    function addedViewPlayerOnTeam(obj) {
        return $(`<div class="item">
                        <div class="content">${obj.value.name}
                            <input type="hidden" name="player_id" data-value=${JSON.stringify(obj.value)}>
                        </div>
                        <div class="content">
                            <div class="ui button red js_remove">Удалить</div>
                        </div>
                    </div>`)
    }

    /**
     * @title Checked element in dropdown
     */
    $('#js_results_dropdown_players').on('click', '.title', function (e) {
        let elem = $(e.target);

        moveElementDropdown(elem.data('value'));
        $('#js_input_search_players').val('');
    });

    /**
     * @title List Elements
     */
    function moveElementDropdown(obj) {
        listPlayers.push(obj);
        let viewElement = buildListView(obj);
        renderViewList(viewElement, '#js_results_list_players');
        containerHide('#js_results_dropdown_players');
    }
    function buildListView(obj) {
        return `<div class="item">
                    <div class="content">${obj.name}</div>
                    <input type="hidden" name="player_id" data-value=${JSON.stringify(obj)}>
                    <div class="content">
                      <div class="ui button js_add">Добавить</div>
                      <div class="ui button red js_remove">Убрать</div>
                    </div>
                </div>`
    }

    $('#js_list_players').on('click', '.js_remove', (e) => {
        let
            event = $(e.currentTarget),
            item = event.closest('.item'),
            value = item.find('[name=player_id]').data('value'),
            form = event.closest('form'),
            url = form.attr('action'),
            team_id = form.find('[name=team_id]').attr('value');

        let data = {
            player_id: value._id,
            team_id: team_id,
            value
        };

        $.ajax(url, {
            method: "POST",
            data,
            success(result, textStatus, jqXHR) {
                item.remove();
            }
        })
    });
    /**
     * @title Dropdown
     */
    function buildListDropdownPlayers(data, container) {
        // let newArr = deleteDublicateDropdownPlayers(data);

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
            return listPlayers.find(el);
        });
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