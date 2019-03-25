$(document).ready(function () {
    var gameStart = false;
    var heroChosen = false;
    var villainChosen = false;
    var heroName;
    var heroHP;
    var enemiesRem = 3;
    var villainName;
    var villainHP;
    var attackCount = 0;
    var attackProgress;
    var counterAttack;

    var character = {
        iceCream: {
            id: 'iceCream',
            name: 'Ice Cream',
            health: 100,
            attack: 12,
            counterAttack: 20
        },
        burger: {
            id: 'burger',
            name: 'Burger',
            health: 120,
            attack: 10,
            counterAttack: 25
        },
        apple: {
            id: 'apple',
            name: 'Apple',
            health: 140,
            attack: 6,
            counterAttack: 15
        },
        avocado: {
            id: 'avocado',
            name: 'Avocado',
            health: 180,
            attack: 8,
            counterAttack: 18
        }
    }

    // ----- FUNCTIONALITY -----

    // Pick hero if one isn't already chosen
    // Moves hero into Hero div && removes hover/active styles
    $('.char-group').on('click', function (hero, villain) {
        if (!heroChosen) {
            $(this).appendTo('#hero')
                .addClass('hero-player');
            $(this).find('img')
                .removeClass('selection');
            $(this).find('.hp-badge')
                .addClass('hp-badge-hero')
                .removeClass('hp-badge');
            $(this).addClass('char-group-hero')
                .removeClass('char-group');

            // Store Hero selection
            hero = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === hero) {
                    $('#your-hero').html('You chose<br><strong>' + value.name + '</strong>');
                }
                heroName = hero;
            });

            // Display enemies
            // Enemies remain in selection div && turns red (evil)
            // Setup opponent selection
            $('#top-text').html('Choose Your <span class="text-danger">Opponent');
            $('.selection').parent()
                .addClass('char-group-evil');
            $('.selection')
                .addClass('evil')
                .removeClass('selection');
            $('.hp-badge').addClass('hp-badge-evil');

            heroChosen = true;

        } else if (heroChosen && !villainChosen) {
            // Stage defenders
            // Pick opponent if one isn't already chosen AND hero is chosen

            var that = this;
            villainSet(that);

            // Remaining enemies stay at top && shrink
            $('.evil').addClass('dormant')
                .removeClass('evil');
            $('.dormant').siblings()
                .css({ 'top': '-20%', 'right': '30%' });
            $('#char-wrapper').removeClass('mb-auto')
                .css('opacity', '0.85');

            villain = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === villain) {
                    $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                }
                villainName = villain;
            });

            villainChosen = true;

            // Display attack button
            $('#btn-fight').removeClass('d-none');
        }
    });

    // ----- ATTACK -----
    // Compare attack rating to defender rating
    // Determine damage
    $('#btn-fight').on('click', function (hero, villain) {
        Object.keys(character).forEach(function (key) {
            hero = character[key];
            villain = character[key];
            if (hero.id === heroName) {
                $('#your-hero').html('<strong>'
                    + hero.name.toUpperCase()
                    + '</strong>');

                // Update Attack results
                attackCount++;
                $('#attack').html('Attacks for <strong>'
                    + hero.attack * attackCount
                    + '</strong> damage!');
                attackProgress = hero.attack * attackCount;
                heroHP = hero.health;
            }
            // Update counter-attack results
            if (villain.id === villainName) {
                $('#your-villain').html('<strong>'
                    + villain.name.toUpperCase()
                    + '</strong>');
                $('#counter-attack').html('Attacks for <strong>'
                    + villain.counterAttack
                    + '</strong> damage!');
                counterAttack = villain.counterAttack;
                villainHP = villain.health;
            }
        });

        // Update HP
        heroHP -= counterAttack * attackCount;
        villainHP -= attackProgress * attackCount;
        $('.hp-badge-hero').find('.hp-digit')
            .html(heroHP);
        $('.villain').siblings().find('.hp-digit')
            .html(villainHP);

        checkHP();
    }); // End ----- #btn-fight 'click'

    // Check HP levels
    // Update display
    function checkHP() {
        if (heroHP <= 0) {
            // Attacker defeated
            // Game Over
            // Allow user to reset - display restart button
            $('#top-text').html('You have been defeated by ' + villainName.toUpperCase());

            restart();

        } else if (villainHP <= 0) {
            // Defender is defeated -- 1 less enemy remains
            enemiesRem--;
            if (enemiesRem === 0) {
                // Defeated everyone!!
                $('#top-text').html('<span class="text-info">You win!</span>');
                // Allow user to reset - display restart button

            } else {
                // Hide attack button
                $('#btn-fight').addClass('d-none');

                $('#counter-attack').html('has been defeated');
                $('#top-text').html('Choose Your Next <span class="text-danger">Opponent');

                // Remove defeated defender
                $('.villain').siblings()
                    .addClass('hp-badge-defeated');
                $('.villain')
                    .addClass('defeated')
                    .addClass('evil')
                    .removeClass('villain');
                $('.villain-player').removeClass('char-group-evil');

                chooseNext();
            }
        }
    } // End ----- checkHP()

    function villainSet(that) {
        // Villain moves to Defender
        // Remove all hover effects
        $('#top-text').html('');
        $(that).removeClass('char-group')
            .addClass('char-group-villain');
        $(that).find('img')
            .removeClass('evil')
            .addClass('villain');
        $(that).prependTo('#villain')
            .addClass('villain-player');
    }

    function chooseNext() {
        // Display opponent choices
        $('#char-wrapper').css('opacity', '1');
        $('.dormant').addClass('evil')
            .removeClass('dormant');
        $('#char-wrapper').find('.hp-badge-evil')
            .css({ 'top': '30px', 'right': '10px' });

        // Select new opponent
        $('.char-group-evil').on('click', function (villain) {
            // Create graveyard div && move defeated villain inside
            $('#char-wrapper').prepend('<div id="graveyard"></div>');
            $('.villain-player').prependTo('#graveyard')
                .removeClass('villain-player');
            $('.defeated').siblings().find('.hp-digit')
                .html('X');

            var that = this;
            villainSet(that);

            // Store new Villain info
            // Reset villainHP
            villain = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === villain) {
                    $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                    $('#counter-attack').html('');
                    villainHP = value.health;
                }
            });

            villainName = villain;
            villainChosen = true;

            // Display attack button
            $('#btn-fight').removeClass('d-none');
        });
    } // End ----- chooseNext()

    function restart() {
        $('#top-text').html('Restart?');
    }
});
