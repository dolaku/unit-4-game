$(document).ready(function () {
    var gameStart = false;
    var heroChosen = false;
    var villainChosen = false;

    var character = {
        iceCream: {
            id: 'iceCream',
            name: 'Ice Cream',
            health: 100,
            attack: 10,
            counterAttack: 20
        },
        apple: {
            id: 'apple',
            name: 'Apple',
            health: 140,
            attack: 12,
            counterAttack: 15
        },
        burger: {
            id: 'burger',
            name: 'Burger',
            health: 120,
            attack: 6,
            counterAttack: 5
        },
        avocado: {
            id: 'avocado',
            name: 'Avocado',
            health: 180,
            attack: 8,
            counterAttack: 18
        }
    }

    if (gameStart) {

    }

    // ----- FUNCTIONALITY ----- 

    // 1. Display characters to select Hero --- created in HTML
    $('.char-group').on('click', function (hero, villain) {
        // Pick hero if one isn't already chosen
        if (!heroChosen) {
            // moves hero into Hero div && removes hover/active styles
            $(this).appendTo('#hero')
                    .addClass('hero-player');
            $(this).find('img')
                    .removeClass('selection');
            $(this).find('.hp-badge')
                    .addClass('hp-badge-hero')
                    .removeClass('hp-badge');
            $(this).addClass('char-group-hero')
                    .removeClass('char-group');

            // 2. Display Hero selection
            hero = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === hero) {
                    $('#your-hero').html('You chose<br><strong>' + value.name + '</strong>');
                }
            });

            // 3. Display enemies
            //      a. enemies remain in selection div && turns red (evil)
            //      b. setup opponent selection
            $('#top-text').html('Choose Your <span class="text-danger">Opponent');
            $('.selection').parent()
                    .addClass('char-group-evil');
            $('.selection')
                    .addClass('evil')
                    .removeClass('selection');
            $('.hp-badge').addClass('hp-badge-evil');

            heroChosen = true;

        } else if (heroChosen && !villainChosen) {
            // Pick opponent if one isn't already chosen AND hero is chosen
            // 4. Stage defender
            //      a. Villain moves to Defender
            //      b. remove all hover effects
            $('#top-text').html('');
            $(this).removeClass('char-group')
            .addClass('char-group-villain');
            $(this).find('img')
            .removeClass('evil')
            .addClass('villain');
            $(this).prependTo('#villain')
            .addClass('villain-player');
            
            //      c. remaining enemies stay at top && shrink
            $('.evil').addClass('dormant')
                    .removeClass('evil');
            $('.dormant').siblings()
                    .css({'top': '-20%', 'right': '30%'});
            $('#char-wrapper').removeClass('mb-auto')
                    .css('opacity', '0.75');

            villain = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === villain) {
                    $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                }
            });

            villainChosen = true;
            
            // 5. Display attack button
            $('#btn-fight').removeClass('d-none');
        }
    });






    // 6.  ATTACK
    //     a. compare attack rating to defender rating
    //     b. determine damage
    //     c. update Attack results
    //     d. update HP
    //     e. check outcome
    //     f. Update display
    //         i. is attacker defeated
    //             a. Game Over
    //             b. Allow user to reset - display restart button
    //         ii. is defender defeated
    //             a. remove defender
    //             b. allow new enemy selection - if there isn't on already selected

});
