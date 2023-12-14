<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'TalenTrail' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Ln^O@)4kjptBmxtf&pNQRrYG-bY5LI`^8cs2d+am8?<..f7(K%bR,M-unvMp;0)C' );
define( 'SECURE_AUTH_KEY',  '69.un<P+Q+bX/f%Yu6U|en}0wFn5]ioA]%;V3^H4;%L$Y+DpTTzjm|3uFg65Vebl' );
define( 'LOGGED_IN_KEY',    ':weqH(_~Oy>aIHEylJ-D9O[ZT3G|XD~%=q?Cy-P/tUj}n~( 85)}mPCU@[jlnh4>' );
define( 'NONCE_KEY',        '@ZSKs_n2eb|7xSkeZ>!Z,c-]}(U:/`/xqf7NFCh}Y4|.dPk-:|8UB9%:!R(*mPBA' );
define( 'AUTH_SALT',        'T(]!I31;Z%}.*QlDo9G:K%J7(7&a0>R><bS[cmYr/a/7I_g8;z1JTKM0k2!>0QBX' );
define( 'SECURE_AUTH_SALT', 'OGA#67(y}@-q95iA1,%apMl%{)ff#luSl!/M`7xUW.TH>BnRNt3EC)t&%hh?6)] ' );
define( 'LOGGED_IN_SALT',   'd#A*W3p7?F):W.&&[;i*wN4F.zVujw.BM(p3:xB(c2TVQ@VHqzL9O^YI<,*+a)y#' );
define( 'NONCE_SALT',       'N7_)j^v[RGu;A:`X]/NY};]IxZ+:Qrgb[`LP*P?}3b#S ,Ae whhhVS4V5fOl<#:' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
