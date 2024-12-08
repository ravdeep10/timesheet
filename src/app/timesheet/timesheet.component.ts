import { Component } from '@angular/core';
import { CalendarOptions, EventInput ,EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
  constructor(private dialog: MatDialog) {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    events: [
      {
        title: '8 Hr (REQ001)',
        start: '2025-01-05',
        color: 'green',
        textColor: 'white',
      },
      {
        title: '4 Hr (REQ002)',
        start: '2025-01-06',
        color: 'yellow',
        textColor: 'black',
      },
      {
        title: '5 Hr (REQ003)',
        start: '2025-01-06',
        color: 'red',
        textColor: 'white',
      },
    ],
    eventClick: (info) => this.onEventClick(info)
  };

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  fromDate: string = '';
  toDate: string = '';
  totalHours: number = 0;
  billableHours: number = 0;
  nonBillableHours: number = 0;

  handleDateClick(arg: DateClickArg) {
    console.log('Date clicked:', arg.dateStr);
    alert(`Date clicked: ${arg.dateStr}`);
  }
  onEventClick(info: EventClickArg) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: {
        title: info.event.title,
        date: info.event.startStr,
        id: info.event.id
      },
      panelClass: 'custom-dialog-container' 
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        console.log('User confirmed action:', result);
      } else {
        console.log('Dialog was closed without action.');
      }
    });
  }
  getTimesheet() {
    console.log('Fetching timesheet data...');
    this.totalHours = 17; 
    this.billableHours = 12;
    this.nonBillableHours = 5;
  }
}
