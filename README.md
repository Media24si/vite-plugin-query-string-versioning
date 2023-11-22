# vite-plugin-query-string-versioning

## Install

```bash
npm i vite-plugin-query-string-versioning
```

## Usage

```js
import queryStringVersioning from 'vite-plugin-query-string-versioning';

export default {
  plugins: [
    queryStringVersioning()
  ]
};
```

## Using in Laravel

When utilizing this plugin in Laravel, it's necessary to override 
the default Vite class to ensure proper detection of CSS files.

In `AppServiceProvider.php` add the following to the `register` method:

```php
$this->app->singleton(
    Vite::class,
    fn() => new class extends Vite {
        protected function isCssPath($path) {
            return Str::contains($path, '.css');
        }
    }
);
```