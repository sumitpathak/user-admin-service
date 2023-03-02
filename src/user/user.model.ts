import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty()
  teacher: string;

  @ApiProperty()
  students: string[];
}

export class RegisterResponse {}

export class GetUserRequest {}

export class GetUserResponse {
  @ApiProperty()
  data: {}[];
}

export class CommonStudentsRequest {
  @ApiProperty()
  teacher: string[];
}

export class CommonStudentsResponse {
  @ApiProperty()
  students: string[];
}

export class StudentSuspendRrequest {
  @ApiProperty()
  student: string;
}

export class StudentSuspendResponse {}

export class RetrieveForNotificationsRequest {
  @ApiProperty()
  teacher: string;

  @ApiProperty()
  notification: string;
}

export class RetrieveForNotificationsResponse {
  @ApiProperty()
  recipients: string[];
}
