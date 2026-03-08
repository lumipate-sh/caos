import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate',
    standalone: true,
})
export class FormatDatePipe implements PipeTransform {
    transform(value: Date | string | null | undefined): string {
        if (!value) {
            return '';
        }

        const date = new Date(value);
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.toLocaleDateString('en-US', { month: 'long' });

        return `${day} of ${month}, ${year}`;
    }
}
