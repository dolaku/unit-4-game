$(document).ready(function () {
    var gameStart = false;
    var heroChosen = false;
    var villainChosen = false;

    var game = {
        character: [
            {
                id: 'ice-cream',
                name: 'Ice Cream',
                health: 100,
                attack: 10,
                counterAttack: 20
            }, {
                id: 'apple',
                name: 'Apple',
                health: 140,
                attack: 12,
                counterAttack: 15
            }, {
                id: 'burger',
                name: 'Burger',
                health: 120,
                attack: 6,
                counterAttack: 5
            }, {
                id: 'avocado',
                name: 'Avocado',
                health: 180,
                attack: 8,
                counterAttack: 10
            }
        ]
    }

    /*
    for (var i = 0; i <character.length[i]; i++)
    
    */

    // if (!gameStart) {
    //     console.log('lets start');
    //     if (!heroChosen) {
    //         console.log('no hero selected yet');
    //         selectHero();

    //     }
    // } else {
    //     console.log('already in a game');
    // }

    // if (heroChosen && !villainChosen) {
    //     selectVillain();
    // }

    // ----- FUNCTIONALITY ----- 
    
    // 1. Display characters to Select -- created in HTML
    $('.char-group').on('click', function (hero) {
        // Pick hero if one isn't already chosen
        if ( !heroChosen ) {
            //     moves hero into Hero div && removes hover effects
            $(this).appendTo('#hero').addClass('hero-player');
            $(this).find('img').removeClass('selection');
            $(this).find('.hp-badge').addClass('hp-badge-hero').removeClass('hp-badge');
            $(this).addClass('char-group-hero').removeClass('char-group');
        
            hero = $(this).attr('id');
            $('#your-hero').html('You\'re playing as<br>' + hero.toUpperCase());
        
        // 2. Keep selection remove extras
        // 3. Place extras in 'Enemies' section -- 
        //      a. enemies remain in selection div && turns red
        //      b. setup opponent selection
            $('#top-text').html('Choose Your <span class="text-danger">Opponent');
            $('.selection').addClass('evil').removeClass('selection');
            $('.hp-badge').addClass('hp-badge-evil');
        
            heroChosen = true;
            console.log('hero selected: ' + $('#hero'));
            console.log(heroChosen);
        }
    });

    $('.char-group').on('click', function (villain) {
        if ( !villainChosen ) {

        }
    // 4. Stage defender
    //      a. Villain moves to Defender
    //      b. remaining enemies stay && shrink
        // $('.char-group').removeClass('selection');
        // $(this).removeClass('char-group').removeClass('evil').addClass('char-group-villain');
        // $(this).appendTo('#villain').addClass('villain-player');
    });






});


// 5. Display attack button
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

